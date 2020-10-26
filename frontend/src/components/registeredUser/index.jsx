import React, { useState } from "react";
import NewsFeed from "./NewsFeed";
import MyNetwork from "./MyNetwork";
import Profile from "./Profile";
import { BrowserRouter, Switch, Route } from "react-router-dom";

const navLinkActive =
  "d-flex text-decoration-none justify-content-center align-items-center p-2 px-lg-2 py-lg-3 border border-primary rounded bg-primary text-white";
const navLink =
  "d-flex text-decoration-none justify-content-center align-items-center p-2 px-lg-2 py-lg-3";
export default function RegisteredUser() {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <React.Fragment>
      <div className="container-fluid sticky-top align-items-center p-3 px-md-4  border-bottom shadow-sm bg-primary">
        <div className="row align-items-center">
          <h5 className=" col-md-3 text-white text-center font-weight-bold text-uppercase align-middle">
            devhub
          </h5>

          <div className="col-md-6">
            <form class="form mt-2 mt-md-0">
              <input
                class="form-control mr-sm-2"
                type="text"
                placeholder="Search for jobs, company, skills, person"
                aria-label="Search"
              />
            </form>
          </div>
          <div className="col-md-3">
            <a class="btn btn-outline-light" href="#">
              Sign up
            </a>
          </div>
        </div>
      </div>
      <div className="container-fluid d-flex no-gutters p-0">
        <div
          className="d-none d-md-block col-3 px-2 py-4 px-lg-4 px-xl-5 text-center bg-white shadow border-right"
          style={{ position: "fixed", top: "88px", left: 0, height: "100%" }}
        >
          <div className="d-flex flex-column " style={{ height: "90vh" }}>
            <a
              href=""
              className="d-flex text-decoration-none justify-content-center align-items-center p-2 px-lg-2 py-lg-3 py-xl-4 border border-primary rounded-pill bg-primary text-white font-weight-bold h6"
            >
              <span className="mr-4">
                <i class="fas fa-plus"></i>
              </span>
              create new post
            </a>
            <div className="d-flex flex-column text-left  justify-content-around flex-grow-1">
              <a
                href="#"
                className={activeTab == 0 ? navLinkActive : navLink}
                onClick={() => setActiveTab(0)}
              >
                <span className="mr-4">
                  <i class="fas fa-home"></i>
                </span>
                home
              </a>
              <a
                href="#"
                className={activeTab == 1 ? navLinkActive : navLink}
                onClick={() => setActiveTab(1)}
              >
                <span className="mr-4">
                  <i class="fas fa-user-friends"></i>
                </span>
                my network
              </a>
              <a
                href="#"
                className={activeTab == 2 ? navLinkActive : navLink}
                onClick={() => setActiveTab(2)}
              >
                <span className="mr-4">
                  <i class="far fa-comment-dots"></i>
                </span>
                messages
              </a>
              <a
                href="#"
                className={activeTab == 3 ? navLinkActive : navLink}
                onClick={() => setActiveTab(3)}
              >
                <span className="mr-4">
                  <i class="fas fa-briefcase"></i>
                </span>
                jobs
              </a>
              <a
                href="#"
                className={activeTab == 4 ? navLinkActive : navLink}
                onClick={() => setActiveTab(4)}
              >
                <span className="mr-4">
                  <i class="fas fa-bookmark"></i>
                </span>
                bla bla
              </a>
            </div>
          </div>
        </div>
        <div id="registered-user-container"
          className="col-12 col-md-9 row bg-gray px-4 pt-4"
        >
          <Profile />
          {/* <JobOpeningDetail /> */}
          {/* <BrowserRouter>
            <Switch> */}
          <Route path="/feed" component={NewsFeed} />
          {/* <Route path="/search" component={Home} /> */}
          <Route path="/mynetwork" component={MyNetwork} />
          {/* <Route path="/message" exact component={Message} /> */}
          {/* <Route path="/user/:username" exact component={RegisteredUser} /> */}
          {/* </Switch>
          </BrowserRouter> */}
          {/* <NewsFeed /> */}
          {/* <GridLayout/> */}
          {/* imported content here */}
        </div>
      </div>
    </React.Fragment>
  );
}
