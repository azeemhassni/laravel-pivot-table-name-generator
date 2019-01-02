import React from "react";
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";
import "./styles.css";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

class App extends React.Component {
  state = {
    modelA: "",
    modelB: ""
  };

  modelsToPivot() {
    if (!this.state.modelA && !this.state.modelB) {
      return null;
    }

    return [this.state.modelA, this.state.modelB]
      .sort()
      .map(model => {
        return model
          .split(/(?=[A-Z])/)
          .join("_")
          .toLowerCase();
      })
      .join("_");
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="App root">
        <div>
          <AppBar position="static">
            <Toolbar variant="dense">
              <IconButton color="inherit" aria-label="Menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit">
                Pivot Table Name Generator
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
        <div className="content">
          <Card className="card">
            <CardContent>
              <form>
                <TextField
                  onChange={e => this.setState({ modelA: e.target.value })}
                  type="text"
                  label="Enter a Model Name"
                />
                <br />
                <br />
                <TextField
                  onChange={e => this.setState({ modelB: e.target.value })}
                  type="text"
                  label="Enter another Model name"
                />
              </form>
            </CardContent>
            <CardActions>
              <div />
              <Typography variant="h5" color="inherit">
                {this.modelsToPivot()}
              </Typography>
            </CardActions>
          </Card>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
