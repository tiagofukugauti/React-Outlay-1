import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@material-ui/core/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Error from '../components/Error';
import Loading from '../components/Loading';
import { calcularTotal, generateCalendar } from '../helpers/funcoesAuxiliares';
//import { apiGetDespesas } from '../services/apiService';
import { apiGetDespesas, apiGetDespesasMes } from '../services/apiService';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.text.secondary,
    color: theme.palette.common.white,
    fontSize: 16,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function ReactManagerPage() {
  const parametros = useParams();
  const history = useNavigate();
  //console.log(history);
  //console.log(parametros.mes);
  const [allDespesas, setAllDespesas] = useState([]);
  const [allDespesasMes, setAllDespesasMes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const weeks = generateCalendar(parametros.mes + '-01', allDespesasMes);
  //console.log('weeks');
  //console.log(weeks);
  const firstDate = weeks[0];
  //const lastDate = weeks.pop();
  const mesCorrente = firstDate.substring(0, 7);
  // console.log('firstDate');
  // console.log(firstDate);
  //console.log(lastDate);
  // console.log('mesCorrente'
  // console.log(mesCorrente);

  useEffect(() => {
    async function getAllDespesasMes() {
      try {
        await apiGetDespesas().then(setAllDespesas);
        await apiGetDespesasMes(mesCorrente).then(setAllDespesasMes);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (error) {
        setError(error.message);
      }
    }
    getAllDespesasMes();
  }, [mesCorrente]);
  //console.log(allDespesas);

  function handleYearFilterChange(ano) {
    ano.preventDefault();
    //let mesCorrente = document.getElementById('month-label').value;
    var anoSelecionado = ano.target.value;
    var teste = anoSelecionado + '-' + mesCorrente.split('-')[1];
    //console.log(teste);
    //console.log('/despesas/' + anoSelecionado + mesCorrente);
    console.log(history);
    history('/despesas/' + teste, { replace: true });
    setAllDespesas(teste);
  }

  function handleMonthFilterChange(mes) {
    mes.preventDefault();
    var mesSelecionado = mes.target.value;
    //console.log(mesSelecionado);
    var teste2 = mesCorrente.split('-')[0] + '-' + mesSelecionado;
    //console.log(teste2);
    //console.log('/despesas/' + anoSelecionado + mesCorrente);
    history('/despesas/' + teste2, { replace: true });
    setAllDespesas(teste2);
  }
  let despesasMes = allDespesasMes.map(despesa => {
    return despesa['valor'];
  });

  let mainJsx = (
    <div className="flex justify-center my-4">
      <Loading />
    </div>
  );

  if (error) {
    mainJsx = <Error>{error}</Error>;
  }

  if (!loading && !error) {
    mainJsx = (
      <>
        <div>
          <Container maxWidth="md">
            <Box
              display="flex"
              alignItems="center"
              marginTop="20px"
              sx={{ justifyContent: 'center' }}
            >
              <Box marginLeft="10px">
                <FormControl sx={{ m: 1, minWidth: 80 }}>
                  <InputLabel id="year-label">Ano</InputLabel>
                  <Select
                    labelId="year-label"
                    id="year-id"
                    defaultValue="2021"
                    onChange={handleYearFilterChange}
                    autoWidth
                    label="Ano"
                    variant="filled"
                  >
                    <MenuItem value="2020">2020</MenuItem>
                    <MenuItem value="2021">2021</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 80 }}>
                  <InputLabel id="month-label">Mês</InputLabel>
                  <Select
                    labelId="month-label"
                    id="month-id"
                    defaultValue="06"
                    onChange={handleMonthFilterChange}
                    autoWidth
                    label="Mes"
                    variant="filled"
                  >
                    <MenuItem value="01">Janeiro</MenuItem>
                    <MenuItem value="02">Fevereiro</MenuItem>
                    <MenuItem value="03">Março</MenuItem>
                    <MenuItem value="04">Abril</MenuItem>
                    <MenuItem value="05">Maio</MenuItem>
                    <MenuItem value="06">Junho</MenuItem>
                    <MenuItem value="07">Julho</MenuItem>
                    <MenuItem value="08">Agosto</MenuItem>
                    <MenuItem value="09">Setembro</MenuItem>
                    <MenuItem value="10">Outubro</MenuItem>
                    <MenuItem value="11">Novembro</MenuItem>
                    <MenuItem value="12">Dezembro</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box marginTop="8px" marginRight="20px" marginLeft="60px">
                <Card sx={{ minWidth: 150 }}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      Despesa Total
                    </Typography>
                    <Typography variant="h7">
                      R$ {calcularTotal(despesasMes).toFixed(2)}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Box>
            <Box marginTop="40px">
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 200 }} aria-label="customized table">
                  <colgroup>
                    <col style={{ width: '35%' }} />
                    <col style={{ width: '25%' }} />
                    <col style={{ width: '20%' }} />
                    <col style={{ width: '20%' }} />
                  </colgroup>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Despesa</StyledTableCell>
                      <StyledTableCell align="left">Categoria</StyledTableCell>
                      <StyledTableCell align="center">Dia</StyledTableCell>
                      <StyledTableCell align="right">
                        Valor (R$)
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allDespesasMes.map(despesa => (
                      <StyledTableRow key={despesa.id}>
                        <StyledTableCell>{despesa.descricao}</StyledTableCell>
                        <StyledTableCell align="left">
                          {despesa.categoria}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {despesa.dia}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {despesa.valor}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Container>
        </div>
      </>
    );
  }
  return (
    <>
      <Header>GESTÃO DE DESPESAS PESSOAIS</Header>
      <Container maxWidth="md">{mainJsx}</Container>
    </>
  );
}
