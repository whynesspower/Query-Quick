import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Home";
import SignInCustomer from "./pages/customers/SignIn";
import RaiseQuery from "./pages/customers/RaiseQuery";
import CustomerChatbox from "./pages/customers/ChatBox";
import SignInAgent from "./pages/agents/SignIn";
import AgentChatBox from "./pages/agents/ChatBox";
import SignupCustomer from "./pages/customers/Signup";
import SignupAgent from "./pages/agents/SingUp";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/logincustomer" element={<SignInCustomer />} />
      <Route path="/raisequery" element={<RaiseQuery />} />
      <Route path="/customerchatbox" element={<CustomerChatbox />} />
      <Route path="/loginagent" element={<SignInAgent />} />
      <Route path="/agentchatbox" element={<AgentChatBox />} />
      <Route path="/customersignup" element={<SignupCustomer />} />
      <Route path="/agentsignup" element={<SignupAgent />} />
    </Routes>
  );
}

export default App;
