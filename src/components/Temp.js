import React, { Component } from "react";
import MuiTreeView from "material-ui-treeview";

export class Temp extends Component {
  constructor() {
    super();
    this.state = {
      tree: [
        {
          value: "Parent A",
          nodes: [{ value: "Child A" }, { value: "Child B" }],
        },
        {
          value: "Parent B",
          nodes: [
            {
              value: "Child C",
            },
            {
              value: "Parent C",
              nodes: [
                { value: "Child D" },
                { value: "Child E" },
                { value: "Child F" },
              ],
            },
          ],
        },
      ],
    };
  }

  onLeafClick = (p_obj)=> {
    console.log("onLeafClick");
  }
  onParentClick= (p_obj)=> {
    console.log("onParentClick");
  }

  render() {
    return (
      <>
        <div className="container">
          <div className="d-flex flex-row">
            <div className="p-2">
              <MuiTreeView
                tree={this.state.tree}
                onLeafClick={this.onLeafClick}
                onParentClick={this.onParentClick}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Temp;
