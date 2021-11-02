import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

const STORE_EMAIL = "STORE_EMAIL";
const STORE_PORTFOLIO = "STORE_PORTFOLIO";
const CHECK_LOGIN = "CHECK_LOGIN";
const STORE_USER_PROJECTS = "STORE_USER_PROJECTS";
const STORE_FOUND_PROJECTS = "STORE_FOUND_PROJECTS";
const STORE_CLICK_PROJECTS = "STORE_CLICK_PROJECTS";
const STORE_CLICK_PROJECTS_COMMENT = "STORE_CLICK_PROJECTS_COMMENT";

const initialState = {
  id: "",
  projectId: "5f5d4063998705209f145e6a",
  userProjects: [],
  foundProjects: [],
  clickProject: {},
  clickIndex: -1,
  allProjects: [],
  comments: [],

  firstName: "",
  lastName: "",
  checkLogin: false,
  email: "",
  username: "",
  phone: "",
  dateOfBirth: "yyyy-mm-dd",
  university: "",
  graduationDate: "yyyy-mm-dd",
  major: "",
};

export function storeEmail(email) {
  console.log("store user action");
  return {
    type: STORE_EMAIL,
    payload: {
      email: email,
    },
  };
}

export function storePortfolio(portfolio) {
  return {
    type: STORE_PORTFOLIO,
    payload: {
      portfolio: portfolio,
    },
  };
}

export function storeCheckLogin(checkLogin) {
  return {
    type: CHECK_LOGIN,
    payload: {
      checkLogin: checkLogin,
    },
  };
}

export function storeUserProjects(projects) {
  return {
    type: STORE_USER_PROJECTS,
    payload: {
      projects: projects,
    },
  };
}

export function storeFoundProjects(projects) {
  return {
    type: STORE_FOUND_PROJECTS,
    payload: {
      projects: projects,
    },
  };
}

export function storeClickProjects(projects, index) {
  return {
    type: STORE_CLICK_PROJECTS,
    payload: {
      projects: projects,
      clickIndex: index,
    },
  };
}

export function storeClickProjectsComment(comments) {
  return {
    type: STORE_CLICK_PROJECTS_COMMENT,
    payload: {
      comments: comments,
    },
  };
}

function userReducer(state = initialState, action) {
  console.log("reducer hit");
  const { payload } = action;
  switch (action.type) {
    case STORE_EMAIL:
      console.log("case store email");
      return {
        ...state,
        email: payload.email,
      };
    case STORE_PORTFOLIO:
      const {
        firstName,
        lastName,
        username,
        email,
        checkLogin,
        phone,
        dateOfBirth,
        university,
        major,
        graduation,
        _id,
      } = payload.portfolio;
      return {
        ...state,
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        checkLogin: checkLogin,
        phone: phone,
        dateOfBirth: dateOfBirth,
        university: university,
        major: major,
        graduationDate: graduation,
        id: _id,
      };
    case CHECK_LOGIN:
      return {
        ...state,
        checkLogin: payload.checkLogin,
      };
    case STORE_USER_PROJECTS:
      return {
        ...state,
        userProjects: payload.projects,
      };
    case STORE_FOUND_PROJECTS:
      return {
        ...state,
        foundProjects: payload.projects,
      };
    case STORE_CLICK_PROJECTS:
      return {
        ...state,
        clickProject: payload.projects,
        clickIndex: payload.clickIndex,
      };
    case STORE_CLICK_PROJECTS_COMMENT:
      return {
        ...state,
        comments: payload.comments,
      };
    default:
      return state;
  }
}

let store = createStore(userReducer, composeWithDevTools());
export default store;
