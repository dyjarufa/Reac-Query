import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { RepositoriesProp } from "./Repos";

export function Repo() {
  const params = useParams();

  const currentRepository = params["*"] as string;

  const queryClient = useQueryClient();

  async function handleChangeRepositoryDescription() {
    // ? ao atualizar a descrição, quero o usuario veja a modificação ao retornar a pagina de listagem
    // ? o invalidateQueries invalida o staleTime na rora 'repos'
    /* await queryClient.invalidateQueries(['repos'])  */

    const previousRepo = queryClient.getQueryData<RepositoriesProp[]>("repos");

    if (previousRepo) {
      const nextRepo = previousRepo.map((repo) => {
        if (repo.full_name === currentRepository) {
          return { ...repo, description: "testing" };
        } else {
          return repo;
        }
      });
      queryClient.setQueryData("repos", nextRepo);
    }
  }

  return (
    <div>
      <h1>{currentRepository}</h1>
      <button onClick={handleChangeRepositoryDescription}>change</button>
    </div>
  );
}
