import { Nav, NavDropdown } from "react-bootstrap";
import NavBar from "../components/NavBar";
import Questions from "../components/Questions";
import Section from "../components/Section";
import Button from "../components/Button";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const facultyAppraisalQuestions = [
  {
    code: "Q1",
    question: "What is your age?",
    answers: ["<30", "30-40", "41-50", ">50"],
  },
  {
    code: "Q2",
    question: "What is your highest level of formal education?",
    answers: ["PhD", "Master's", "Bachelor's", "Other"],
  },
  {
    code: "Q3",
    question: "How many research publications have you authored?",
    answers: ["<5", "5-10", "11-20", ">20"],
  },
  {
    code: "Q4",
    question:
      "Which academic events/seminars have you participated in over the last year?",
    answers: [
      "International Conference",
      "National Conference",
      "Workshop",
      "Other",
    ],
  },
  {
    code: "Q5",
    question: "How many projects have you supervised in the last year?",
    answers: ["0", "1-3", "4-6", ">6"],
  },
  {
    code: "Q6",
    question:
      "What types of academic contributions have you made recently? (Select all that apply)",
    answers: ["Research", "Lectures", "Seminars", "Community Engagement"],
  },
  {
    code: "Q7",
    question: "Which platforms do you use to publish your research?",
    answers: ["Google Scholar", "ResearchGate", "Journals", "Conferences"],
  },
  {
    code: "Q8",
    question:
      "Do you participate in curriculum development at your institution?",
    answers: ["Yes", "No "],
  },
  {
    code: "Q9",
    question:
      "How often do you engage in professional development activities (workshops, courses)?",
    answers: ["Monthly", "Quarterly", "Annually", "Rarely"],
  },
  {
    code: "Q10",
    question: "What is your gender?",
    answers: ["Male", "Female", "Non-binary", "Prefer not to say"],
  },
];

function ApprisalForm() {
  const [responses, setResponses] = useState({});
  const [usersData, setUsersData] = useLocalStorageState([], "UserData");
  const [userName, setUserName] = useState("");

  function handleResponseChange(question, answer) {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [question]: answer,
    }));
  }

  function handleSubmit(responses) {
    setUsersData((prevData) => {
      console.log({ ...prevData, responses });
      return [...prevData, { name: userName, ...responses }];
    });
    setResponses({});
  }

  return (
    <>
      <NavBar>
        <Nav>
          <NavDropdown
            title={
              <span className="text-white">
                {" "}
                <FontAwesomeIcon
                  icon={faCircleUser}
                  className=" relative mr-2 top-0.5 h-5"
                />
                Welcome, Username
              </span>
            }
            id="collapsible-nav-dropdown"
          >
            <NavDropdown.Item href="#action/3.2">Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">SignOut</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </NavBar>
      <Section>
        <div className="relative mx-60 mt-10 mb-28">
          <div className="grid gap-6 ">
            <label
              for="name"
              className=" flex border-[1px] pl-3 py-2.5 pr-9 rounded-md border-[#dee2e6] has-[:focus]:border-[#86b7fe] has-[:focus]:shadow-[0_0px_0px_0.25rem_rgba(13,110,253,.25)]"
            >
              Name:
              <input
                type="text"
                id="name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                // placeholder="name"
                className="has focus:outline-none w-full ml-2 px-2 border-b-2 border-b-[#dee2e6]"
              />
            </label>

            {facultyAppraisalQuestions.map((question, index) => (
              <Questions
                key={index}
                question={question}
                selectedAnswer={responses[question.question] || "Choose..."}
                onResponseChange={handleResponseChange}
              />
            ))}
          </div>
          <div>
            <span className="absolute right-0">
              <Button type={"submit"} onClick={() => handleSubmit(responses)}>
                Submit
              </Button>
            </span>
          </div>
        </div>
      </Section>
    </>
  );
}

export default ApprisalForm;
