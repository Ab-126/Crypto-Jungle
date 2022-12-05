import { ThemeProvider } from "@emotion/react";
import { CircularProgress } from "@mui/material";
import { dark } from "@mui/material/styles/createPalette";
import { createTheme } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { HistoricalChart } from "../config/api";
import { CryptoState } from "../CryptoContext";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { chartDays } from "../config/data";
import SelectButton from "./SelectButton";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setHistoricData(data.prices);
    console.log(data);
  };
  console.log("data", historicData);

  useEffect(() => {
    fetchHistoricData();
  }, [currency, days]);

  const darkTheme = createTheme({
    palette: {
      Primary: {
        main: "#fff",
      },
      mode: dark,
    },
  });

  if (!historicData)
    return (
      <CircularProgress style={{ color: "#347C2C" }} size={250} thickness={1} />
    );
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="containerCoin">
        {!historicData ? (
          <CircularProgress
            style={{ color: "#347C2C" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}: ${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days == 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price (Past ${days} Days) in ${currency}`,
                    borderColor: "#347C2C",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => setDays(day.value)}
                  selected={day.value == days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;
