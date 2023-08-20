import React, {useEffect, useState} from 'react'
import { Cryptostate } from '../CryptoContext';
import axios from 'axios';
import { HistoricalChart } from '../Config/Api';
import { CircularProgress, ThemeProvider, createTheme, makeStyles } from '@material-ui/core';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { chartDays } from '../Config/data';
import SelectButton from './SelectButton';

const useStyles = makeStyles((theme)=> ({
  container: {
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    }
  },
}));

const CoinInfo = ({coin}) => {

  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = Cryptostate();
  const classes = useStyles();

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark"
    },
  });

  useEffect(()=> {
    const fetchHistoricalData = async () => {
      const { data } = await axios.get(HistoricalChart(coin.id, days, currency))
      setHistoricData(data.prices);
    }
    fetchHistoricalData();
  },[currency, days])

  console.log("data", historicData);

  return (
        <ThemeProvider theme={darkTheme}>
          <div className={classes.container}>
            {!historicData ? (
                <CircularProgress
                style={{color: "gold"}}
                size={250}
                thickness={1}
                />
              ) : (
              <>
              <Line
              data={{
                labels: historicData.map((coin)=>{
                  let date = new Date(coin[0]);
                  let time =
                  date.getHours() > 12
                  ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                  : `${date.getHours()}:${date.getMinutes()} AM`

                return days === 1 ? time : date.toLocaleDateString()
                }),

                datasets: [{
                  data : historicData.map((coin) => coin[1]),
                  label: `Price ( Past ${days} Days ) in ${currency}`,
                  borderColor: "#EEBC1D",
                  pointRadius: 0,
                }],
              }}
              />
              <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}>
                {chartDays.map(day=> (
                  <SelectButton
                  key={day.value}
                  onClick={()=>setDays(day.value)}
                  selected={day.value === days}
                  >
                    {day.label}
                  </SelectButton>
                ))}
              </div>
              </>
              )
            }
          </div>
        </ThemeProvider>
  )
}

export default CoinInfo