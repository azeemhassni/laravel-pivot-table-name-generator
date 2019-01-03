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
import Highlight from "react-highlight";

class App extends React.Component {
  state = {
    modelA: "Post",
    modelB: "Category"
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
                  value={this.state.modelA}
                  onChange={e => this.setState({ modelA: e.target.value })}
                  type="text"
                  label="Enter a Model Name"
                />
                <br />
                <br />
                <TextField
                  value={this.state.modelB}
                  onChange={e => this.setState({ modelB: e.target.value })}
                  type="text"
                  label="Enter another Model name"
                />
              </form>
            </CardContent>
            <CardActions>
              <Typography variant="h5" color="inherit">
                Table Name: {this.modelsToPivot()}
              </Typography>
            </CardActions>

            <div>
              <Typography component="p" color="inherit">
                Generated Schema
              </Typography>
              <Highlight language="php">{`
 /** Create a migration file and put the following code in it**/
Schema::create('${this.modelsToPivot()}', function (Blueprint $table) {                  
    $table->unsignedInteger('${this.getForiegnKey(this.state.modelA)}')
    $table->unsignedInteger('${this.getForiegnKey(this.state.modelB)}')
});
`}</Highlight>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  getForiegnKey(model) {
    return model
      .split(/(?=[A-Z])/)
      .join("_")
      .toLowerCase()
      .concat("_id");
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
