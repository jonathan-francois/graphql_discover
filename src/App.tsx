import { ApolloError, gql, useQuery } from "@apollo/client";
import logo from "./logo.svg";
import "./App.css";

interface LaunchesRequestVar {
  limit: number;
}
interface ILaunch {
  launch_date_utc: string;
  launch_success: boolean;
  links: { video_link: string };
  details: string;
  rocket: { rocket_name: string };
}
interface ILaunches {
  launches: ILaunch[];
}

const FIVE_LAUNCHES = gql`
  query GetFiveLaunches($limit: Int!) {
    launches(limit: $limit) {
      launch_date_utc
      launch_success
      links {
        video_link
      }
      details
      rocket {
        rocket_name
      }
    }
  }
`;

function App() {
  const { loading, data } = useQuery<ILaunches, LaunchesRequestVar>(
    FIVE_LAUNCHES,
    {
      variables: { limit: 5 },
    }
  );
  if (loading) return <h1>Chargement....</h1>;

  return (
    <div className="app">
      <h1>Launches</h1>
      <ol>
        {data?.launches.map((launch) => {
          return (
            <li>
              <ul>
                <li>Date d'envole UTC : {launch.launch_date_utc}</li>
                <li>Succés : {launch.launch_success ? "Oui" : "Non"}</li>
                <li>Vidéo : {launch.links.video_link}</li>
                <li>Nom : {launch.rocket.rocket_name}</li>
                <li>Détails : {launch.details}</li>
              </ul>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default App;
