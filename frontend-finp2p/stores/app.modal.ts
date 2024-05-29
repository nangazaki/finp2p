export const useAppModalStore = defineStore("modais", () => {
  const modalFaq = ref<boolean>(false);
  const onModalFaq = (value: boolean) => (modalFaq.value = value);

  const modalContact = ref<boolean>(false);
  const onModalContact = (value: boolean) => (modalContact.value = value);

  const modalLogin = ref<boolean>(false);
  const onModalLogin = (value: boolean) => (modalLogin.value = value);

  const modalFeedback = ref<ModalFeedback>();
  const onModalFeedback = (value: ModalFeedback) => {
    modalFeedback.value = value;
  };

  const modalAceptProject = ref<ModalProject>();
  const onModalAceptProject = (value: ModalProject) => {
    modalAceptProject.value = value;
  };

  const modalRejectProject = ref<ModalProject>();
  const onModalRejectProject = (value: ModalProject) => {
    modalRejectProject.value = value;
  };

  const modalInvestir = ref<ModalInvestir>();
  const onModalInvestir = (value: ModalInvestir) => {
    modalInvestir.value = value;
  };

  const modalReference = ref<boolean>(false);
  const onModalReference = (value: boolean) => (modalReference.value = value);

  const modalPayment = ref<boolean>(false);
  const onModalPayment = (value: boolean) => (modalPayment.value = value);

  return {
    modalFaq,
    onModalFaq,
    modalContact,
    onModalContact,
    modalLogin,
    onModalLogin,
    modalFeedback,
    onModalFeedback,
    modalAceptProject,
    onModalAceptProject,
    modalRejectProject,
    onModalRejectProject,
    modalInvestir,
    onModalInvestir,
    modalReference,
    onModalReference,
    modalPayment,
    onModalPayment,
  };
});

export type ModalProject = {
  state: boolean;
  info: {
    id: string;
    name: string;
  };
};

export type ModalFeedback = {
  state: boolean;
  info: {
    id: string;
    name: string;
    createdAt: string;
    email: string;
    message: string;
  };
};

export type ModalInvestir = {
  state: boolean;
};
