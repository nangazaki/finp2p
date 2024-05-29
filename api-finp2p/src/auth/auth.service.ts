import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import { compareSync } from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User) {
    const payload = { sub: user.id, email: user.email };

    const userInfo = await this.prisma.user.findUnique({
      where: { id: user.id },
      include: { entity: true },
    });

    return {
      userInfo,
      token: this.jwtService.sign(payload),
    };
  }

  async userLogged(id: string) {
    try {
      const userInfo = await this.prisma.user.findUnique({
        where: { id },
      });

      if (!userInfo) {
        throw new UnauthorizedException('Token inválido ou expirado.');
      }

      return userInfo;
    } catch (error) {
      throw error;
    }
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        console.log(`Usuário não encontrado para o e-mail ${email}`);
        return null;
      }

      // Supondo que a senha já esteja criptografada no momento da inserção
      const isPasswordValid = compareSync(password, user.password);
      if (!isPasswordValid) {
        console.log(`Senha inválida para o e-mail ${email}`);
        return null; // Retorna null se a senha for inválida
      }

      return user; // Retorna o usuário se a senha for válida
    } catch (error) {
      console.error(`Erro ao validar usuário: ${error}`);
      return null;
    }
  }
}
