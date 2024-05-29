<script setup lang="ts">
import type { ApexOptions } from "apexcharts";

interface IProps {
  impacts: {
    approved: number;
    pendent: number;
  };
}

const { impacts } = defineProps<IProps>();

const options: ApexOptions = {
  chart: {
    height: 350,
    type: "donut",
  },
  title: {
    text: "Projectos",
    align: "center",
    style: {
      fontSize: "20px",
    },
  },
  fill: {
    colors: ["#5ace5a", "#fdc500"],
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: true,
  },
  plotOptions: {
    pie: {
      startAngle: 0,
      endAngle: 360,
      expandOnClick: true,
      offsetX: 0,
      offsetY: 47,
      customScale: 1,
      dataLabels: {
        offset: 0,
        minAngleToShowLabel: 10,
      },
      donut: {
        size: "65%",
        background: "transparent",
        labels: {
          show: true,
          name: {
            show: true,
            fontSize: "22px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 600,
            offsetY: -10,
            formatter: function (val) {
              return val;
            },
          },
          value: {
            show: true,
            fontSize: "16px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 400,
            color: undefined,
            offsetY: 16,
            formatter: function (val) {
              return val;
            },
          },
          total: {
            show: false,
            showAlways: false,
            label: "Total",
            fontSize: "22px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 600,
            color: "#373d3f",
            formatter: function (w) {
              return w.globals.seriesTotals.reduce((a, b) => {
                return a + b;
              }, 0);
            },
          },
        },
      },
    },
  },
  labels: ["Aprovados", "Pendentes"],
  colors: ["#5ace5a", "#fdc500"],
  legend: {
    position: "bottom",
  },
  stroke: {
    colors: undefined,
  },
};

const series = [impacts.approved, impacts.pendent];
</script>

<template>
  <div>
    <apexchart
      id="graphic-impacts"
      height="350"
      type="donut"
      :options="options"
      :series="series"
    >
    </apexchart>
  </div>
</template>
