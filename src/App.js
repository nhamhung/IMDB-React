import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Link } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import MovieDetailPage from "./pages/MovingDetailPage";
import MovieListPage from "./pages/MovieListPage";

function App() {
  return (
    <div>
      <NavigationBar />
      <Switch>
        <Route path="/movie/:id" component={MovieDetailPage} />
        <Route
          path="/movies/top_rated"
          render={(props) => <MovieListPage {...props} type="top_rated" />}
        />
        <Route
          path="/movies/upcoming"
          render={(props) => <MovieListPage {...props} type="upcoming" />}
        />
        <Route path="/" component={MovieListPage} />
      </Switch>
    </div>
  );
}

export default App;
