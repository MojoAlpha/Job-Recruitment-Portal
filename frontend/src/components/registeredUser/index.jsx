import React, { useState, useEffect } from "react";
import Feed from "./NewsFeed";
import MyNetwork from "./MyNetwork";
import Jobs from './Jobs'
import Profile from "./Profile";
import { tokenAxios } from '../api'
import { BrowserRouter, Switch, Route, useRouteMatch, Link, useLocation } from "react-router-dom";
import VacancyDetail from "./components/VacancyDetail";
import { getImageName } from "../utility";
import NotificationItem from "./components/NotificationItem";
import GloabalSearch from "./components/GloabalSearch";
import UserProfile from "../CRUD/UserProfile";

const navLinkActive = "d-flex text-decoration-none justify-content-center align-items-center p-2 px-lg-2 py-lg-3 border border-primary rounded bg-primary text-white";
const navLink = "d-flex text-decoration-none justify-content-center align-items-center p-2 px-lg-2 py-lg-3";

export default function RegisteredUser() {
  let { path, url } = useRouteMatch();
  const [activeTab, setActiveTab] = useState('');
  //basic details of logged in user
  const [loggedInUserDetails, setLoggedInUserDetails] = useState({})
  const [notifications, setNotifications] = useState([])
  const [showNotification, setShowNotification] = useState(false)

  useEffect(() => {
    //fetching basic details of loggedin user
    tokenAxios.get(`/user/me`)
      .then(response => {
        if (response.status == 200)
          setLoggedInUserDetails(response.data)
        else
          console.log(response.err)
      })
      .catch(error => {
        console.log(error)
        if (error.message === 'Network Error')
          alert("internet lgwa le garib aadmi")
      })
  }, [])

  const toggleNotification = () => {
    setShowNotification(!showNotification)
  }

  const fetchNofications = () => {
    toggleNotification()
    tokenAxios.get(`/user/me/notifications`)
      .then(response => {
        if (response.status == 200)
          setNotifications(response.data.notifications)
        else
          console.log(response.err)
      })
      .catch(error => {
        console.log(error)
        if (error.message === 'Network Error')
          alert("internet lgwa le garib aadmi")
      })
  }

  console.log(`active path:${activeTab}`)
  //name of the image file
  const profileImg = loggedInUserDetails.dp ? getImageName(loggedInUserDetails.dp) : getImageName(loggedInUserDetails.logo)
  //folder in which the image file is depending upon the user type
  const imgFolder = loggedInUserDetails.type == 'U' ? 'dp' : 'logo'

  const notificationList = notifications.map(notification => <NotificationItem item={notification} toggleNotification={toggleNotification} />)
  return (
    <React.Fragment>
      <div className="container-fluid sticky-top align-items-center p-3 px-md-4  border-bottom shadow-sm bg-primary">
        <div className="row align-items-center">
          {/* devhub logo */}
          <h5 className=" col-md-3 text-white text-center font-weight-bold text-uppercase align-middle">
            devhub
          </h5>

          {/* global search box */}
          <div className="col-md-6">
            <GloabalSearch placeholder="Search for jobs, company, skills, person" />
          </div>

          <div className="col-md-3">
            {/* profile btn */}
            <Link to={`/user/${loggedInUserDetails.type}/${loggedInUserDetails._id}`} class="text-white text-decoration-none font-weight-bold text-capitalize" >
              <img src={`http://localhost:8000/${imgFolder}/${profileImg}`} alt="" width="30px" height="30px" className="rounded-circle" /> profile
            </Link>

            {/* notifications */}
            <span className="ml-5" onClick={fetchNofications} style={{ position: 'relative', cursor: 'pointer' }}>
              <i class="fas fa-bell text-white"></i>
              <span class="badge badge-warning align-self-center ml-2">{loggedInUserDetails.unreadNotification == 0 ? null : loggedInUserDetails.unreadNotification}</span>
              {showNotification && <div className="bg-light shadow rounded" style={{ position: 'absolute', left: '-6em', right: '-6em' }}>
                {console.log(`notification list`)}
                {console.log(notificationList)}
                {notificationList}
              </div>}
            </span>
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
              <Link to={`${path}/feed`} className={activeTab == 'feed' ? navLinkActive : navLink}
              >

                <span className="mr-4">
                  <i class="fas fa-home"></i>
                </span>
                home
              </Link>
              <Link to={`${path}/network`}
                className={activeTab == 'network' ? navLinkActive : navLink}
              >
                <span className="mr-4">
                  <i class="fas fa-user-friends"></i>
                </span>
                my network
              </Link>
              <Link to={`${path}/messages`}
                className={activeTab == 'messages' ? navLinkActive : navLink}
              >
                <span className="mr-4">
                  <i class="far fa-comment-dots"></i>
                </span>
                messages
              </Link>
              <Link to={`${path}/jobs`}
                className={activeTab == 'jobs' ? navLinkActive : navLink}
              >
                <span className="mr-4">
                  <i class="fas fa-briefcase"></i>
                </span>
                jobs
              </Link>
              <a
                href="#"
                className={activeTab == 4 ? navLinkActive : navLink}
              >
                <span className="mr-4">
                  <i class="fas fa-bookmark"></i>
                </span>
                bla bla
              </a>
            </div>
          </div>
        </div>
        <div id="registered-user-container" className="col-12 col-md-9 bg-gray px-4 pt-4">
          {/* todo:make these routes protected */}
          <Switch>
            <Route exact path={`${path}/vacancy/:id`}>
              <VacancyDetail setActiveTab={setActiveTab} />
            </Route>
            <Route exact path={`${path}/:type/:id`}>
              <Profile setActiveTab={setActiveTab} />
            </Route>
            <Route path={`${path}/feed`} exact >
              <Feed setActiveTab={setActiveTab} />
            </Route>
            <Route path={`${path}/jobs`} exact >
              <Jobs setActiveTab={setActiveTab} />
            </Route>
            <Route path={`${path}/network`} exact >
              <MyNetwork setActiveTab={setActiveTab} />
            </Route>
            <Route path={`${path}/:type/:id/edit`} exact >
              <UserProfile />
            </Route>

          </Switch>
          {/* <JobOpeningDetail /> */}
          {/* <BrowserRouter>
            <Switch> */}
          {/* <Route path="/feed" component={NewsFeed} /> */}
          {/* <Route path="/search" component={Home} /> */}
          {/* <Route path="/mynetwork" component={MyNetwork} /> */}
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
