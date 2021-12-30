import { get } from './httpService';

export async function apiGetDespesas() {
  const allDespesas = await get('/despesas');
  //console.log(allDespesas);
  return allDespesas;
}

export async function apiGetDespesasMes(mes) {
  const allDespesasMes = await get(`/despesas?mes=${mes}&_sort=dia`);
  return allDespesasMes;
}

export async function apiGetUserEndpoint() {
  const user = await get('/auth/user');
  //console.log(user);
  return user;
}
