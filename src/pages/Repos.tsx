import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

export type RepositoriesProp = {
  full_name: string;
  description: string;
};

export function Repos() {
  /*   const { data: repositories, isFetching } = useFetch<repositories[]>(
    "users/dyjarufa/repos"
    //{ header config} / aqui eu poderia passar a conf do header *AxiosRequestConfig
  ); */

  //* quando o usuario sair e volta para tela, o conteúdo será atualizado
  const { data, isFetching } = useQuery<RepositoriesProp[]>(
    "repos",
    async () => {
      // repos é apenas o identificador da minha chamada
      const response = await axios.get(
        "https://api.github.com/users/dyjarufa/repos"
      );

      return response.data;
    },
    {
      staleTime: 1000 * 60, //? (1min) Qual p tempo vou manter estes dados em cache até eu informar que estão obsoletos, vou precisar buscar novamente
    }
  );

  return (
    <ul>
      {isFetching && <p>is loading...</p>}
      {data?.map((repo) => {
        return (
          <li key={repo.full_name}>
            <Link to={`/repo/${repo.full_name}`}>{repo.full_name}</Link>
            <p>{repo.description}</p>
          </li>
        );
      })}
    </ul>
  );
}
