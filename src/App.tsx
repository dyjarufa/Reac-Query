import { useFetch } from "./hooks/useFetch";

type repositories = {
  full_name: string;
  description: string;
};

function App() {
  const { data: repositories, isFetching } = useFetch<repositories[]>(
    "users/dyjarufa/repos"
    //{ header config} / aqui eu poderia passar a conf do header *AxiosRequestConfig
  );

  return (
      <ul>
      {isFetching && <p>is loading...</p> }
        {repositories?.map((repo) => {
          return (
            <li key={repo.full_name}>
              <p>{repo.description}</p>
            </li>
          );
        })}
      </ul>
  );
}

export default App;
