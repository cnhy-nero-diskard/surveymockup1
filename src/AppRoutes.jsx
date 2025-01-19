import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
// Import all the pages
import LanguageSelector from './pages/languageselector/LanguageSelector';
import Residence1 from './pages/residence1/Residence1';
import MainPurpose from './pages/mainpurpose/MainPurpose';
import VisitFrequencyForm from './pages/visitfrequencyform/VisitFrequencyForm';
import SurveyConsent from './pages/surveyconsent/SurveyConsent';
import Form from './pages/form/Form';
import Greetings from './pages/greetings/Greetings';
import BranchingSelect from './pages/branchingselect/BranchingSelect';
import Page1 from './pages/page1/Page1';
import SurveyEvaluation05 from './pages/surveyevaluation1/SurveyEvaluation05';
import SurveyEvaluationb from './pages/surveyevaluation2/SurveyEvaluationb';
import ThankYouMessage from './pages/thanku/ThankYouMessage';
import Willrecom from './pages/reccommevent/Willrecom';
import WhereLearn from './pages/wherelearn/WhereLearn';
import SurveyVenue from './pages/surveyvenue/SurveyVenue';
import OpenEnded2 from './pages/OpenEnded2LIfestyle/OpenEnded2';
import OpenEnded1 from './pages/OpenEnded1Hotel/OpenEnded1';
import HowManyVisits from './pages/events1/HowManyVisits';
import PrimaryAtt from './pages/events2/PrimaryAtt';
import RateAttraction from './pages/events3/RateAttraction';
import EventsOpen1 from './pages/eventsopenended/EventsOpen1';
import EventsOpen2 from './pages/eventsopenended2/EventsOpen2';
import AttractionsFeedback from './pages/eventsopenended2/AttractionsFeedback';
import PackageTourFeedback from './pages/eventsopenended2/PackageTourFeedback';
import AttractionForm from './pages/events4/AttractionForm';
import Services2 from './pages/services2/Services2';
import Services1 from './pages/services1/Services1';
import DestinationShoppingList from './pages/services3/DestinationShoppingList';
import VisitCounterAtt from './pages/hmvisits/VisitCounterAtt';
import TravelQuestion from './pages/travelquestion/TravelQuestion';
import TravelWith from './pages/travelwith/TravelWith';
import TravelOptions from './pages/packagetour1/TravelOptions';
import PackageTourItems from './pages/packageitems/PackageTourItems';
import PackagePaid from './pages/packagetourpaid/PackagePaid';
import ExpenseTracker from './pages/packagerecall/ExpenseTracker';
import PercentageShareList from './pages/packagerecall2/PercentageShareList';
import ExpenseCompanions from './pages/expensecompanion/ExpenseCompanions';
import PackTranspo from './pages/packTranspo/PackTranspo';
import HowManyNights from './pages/accomodation1/HowManyNights';
import AccommodationForm from './pages/accomodation2/AccomodationForm';
import BookingForm from './pages/accomodation3/BookingForm';
import WhereStayArrival from './pages/accomodation4/WhereStay_arrival';
import WhereStayDeparture from './pages/accomodation4/WhereStay_depart';
import AccomodationOpen1 from './pages/accomodation5o/AccomodationOpen1';
import AccomodationOpen2 from './pages/accomodation6o/AccomodationOpen2';
import Transportation3 from './pages/transportation3/Transportation3';
import Transportation1 from './pages/transportation1/Transportation1';
import Transportation2 from './pages/transportation2/Transportation2';
import PProfile2 from './pages/personalprofile2/PProfile2';
import PProfile1 from './pages/personalprofile1/PProfile1';
import ProponentLgu from './pages/proponentlgu/ProponentLgu';
import { LanguageProvider } from './components/partials/LanguageContext';
import TourismAttractionsTable from './components/admin/attractions/TourismAttractionsTable';
import AdminSessionDashboard from './components/admin/adminsessiondashboard/AdminSessionDashboard';
import Login from './components/admin/login/Login';
import Dashboard from './components/admin/maindashboard/Dashboard';
import OverallMun from './components/admin/maindashboard/OverallMun';
import OverallBarangay from './components/admin/maindashboard/OverallBarangay';
import OverallSurveyTopic from './components/admin/maindashboard/OverallSurveyTopic';
import OverallOneBarangay from './components/admin/maindashboard/OverallOneBarangay';
import TMGraph from './components/admin/maindashboard/TMGraph';


const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const ButtonGrid = () => {
  const navigate = useNavigate();

  // Define the button-to-route mapping
  const buttonRoutes = [
    { label: 'Language Selector', path: '/languageselector' },
    { label: 'Residence 1', path: '/residence1' },
    { label: 'Main Purpose', path: '/mainpurpose' },
    { label: 'Visit Frequency Form', path: '/visitfrequencyform' },
    { label: 'Survey Consent', path: '/surveyconsent' },
    { label: 'Form', path: '/form' },
    { label: 'Greetings', path: '/greetings' },
    { label: 'Branching Select', path: '/branchingselect' },
    { label: 'Page 1', path: '/page1' },
    { label: 'Survey Evaluation 05', path: '/surveyevaluation05' },
    { label: 'Survey Evaluation B', path: '/surveyevaluationb' },
    { label: 'Thank You Message', path: '/thankyoumessage' },
    { label: 'Will Recommend', path: '/willrecom' },
    { label: 'Where Learn', path: '/wherelearn' },
    { label: 'Survey Venue', path: '/surveyvenue' },
    { label: 'Open Ended 2', path: '/openended2' },
    { label: 'Open Ended 1', path: '/openended1' },
    { label: 'How Many Visits', path: '/howmanyvisits' },
    { label: 'Primary Attraction', path: '/primaryatt' },
    { label: 'Rate Attraction', path: '/rateattraction' },
    { label: 'Events Open 1', path: '/eventsopen1' },
    { label: 'Attractions Feedback', path: '/attractionsfeedback' },
    { label: 'Package Tour Feedback', path: '/packagetourfeedback' },
    { label: 'Attraction Form', path: '/attractionform' },
    { label: 'Services 2', path: '/services2' },
    { label: 'Services 1', path: '/services1' },
    { label: 'Destination Shopping List', path: '/destinationshoppinglist' },
    { label: 'Visit Counter', path: '/visitcounteratt' },
    { label: 'Travel Question', path: '/travelquestion' },
    { label: 'Travel With', path: '/travelwith' },
    { label: 'Travel Options', path: '/traveloptions' },
    { label: 'Package Tour Items', path: '/packagetouritems' },
    { label: 'Package Paid', path: '/packagepaid' },
    { label: 'Expense Tracker', path: '/expensetracker' },
    { label: 'Percentage Share List', path: '/percentagesharelist' },
    { label: 'Expense Companions', path: '/expensecompanions' },
    { label: 'Pack Transpo', path: '/packtranspo' },
    { label: 'How Many Nights', path: '/howmanynights' },
    { label: 'Accommodation Form', path: '/accommodationform' },
    { label: 'Booking Form', path: '/bookingform' },
    { label: 'Where Stay Arrival', path: '/wherestayarrival' },
    { label: 'Where Stay Departure', path: '/wherestaydepart' },
    { label: 'Accommodation Open 1', path: '/accomodationopen1' },
    { label: 'Accommodation Open 2', path: '/accomodationopen2' },
    { label: 'Transportation 3', path: '/transportation3' },
    { label: 'Transportation 1', path: '/transportation1' },
    { label: 'Transportation 2', path: '/transportation2' },
    { label: 'Personal Profile 2', path: '/pprofile2' },
    { label: 'Personal Profile 1', path: '/pprofile1' },
    { label: 'Proponent LGU', path: '/proponentlgu' },
    { label: 'Tourism Attractions', path: '/tourismattractionstable' },
    { label: 'Main Dashboard', path: '/dashboard' },
    { label: 'Login', path: '/login' },
    { label: 'Admin Session Dashboard', path: '/AdminSessionDashboard' },
    { label: 'Overall Sentiment', path: '/overallmun' },
    { label: 'Overall Sentiment Barangay', path: '/overallbarangay' },
    { label: 'Overall Sentiment Topic', path: '/overalltopic' },
    { label: 'Overall One Barangay', path: '/overallone' },
    { label: 'Topic Modelling', path: '/tmgraph' },
  ];

  // Load state from localStorage on mount
  const [checkedStates, setCheckedStates] = React.useState(() => {
    const savedState = localStorage.getItem('checkedStates');
    return savedState ? JSON.parse(savedState) : Array(buttonRoutes.length).fill(false);
  });

  // Save state to localStorage whenever it changes
  React.useEffect(() => {
    localStorage.setItem('checkedStates', JSON.stringify(checkedStates));
  }, [checkedStates]);

  const handleCheckboxChange = (index) => {
    const newCheckedStates = [...checkedStates];
    newCheckedStates[index] = !newCheckedStates[index];
    setCheckedStates(newCheckedStates);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
      {buttonRoutes.map((button, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="checkbox"
            checked={checkedStates[index]}
            onChange={() => handleCheckboxChange(index)}
            style={{ marginRight: '10px' }}
          />
          <button
            onClick={() => navigate(button.path)}
            disabled={checkedStates[index]}
            style={{
              padding: '10px',
              fontSize: '16px',
              cursor: 'pointer',
              backgroundColor: checkedStates[index] ? 'grey' : '',
              color: checkedStates[index] ? 'white' : '',
            }}
          >
            {button.label}
          </button>
        </div>
      ))}
    </div>
  );
};

// App Component
const AppRoutes = () => {
  return (
    <LanguageProvider>
      <Router>
        {/* <Title>(DEBUG) ALL SURVEY WEBPAGES</Title> */}
        <Routes>
          <Route path="/" element={<ButtonGrid />} />
          <Route path="/login" element={<Login />} />
          <Route path="/languageselector" element={<LanguageSelector />} />
          <Route path="/residence1" element={<Residence1 />} />
          <Route path="/mainpurpose" element={<MainPurpose />} />
          <Route path="/visitfrequencyform" element={<VisitFrequencyForm />} />
          <Route path="/surveyconsent" element={<SurveyConsent />} />
          <Route path="/form" element={<Form />} />
          <Route path="/greetings" element={<Greetings />} />
          <Route path="/branchingselect" element={<BranchingSelect />} />
          <Route path="/page1" element={<Page1 />} />
          <Route path="/surveyevaluation05" element={<SurveyEvaluation05 />} />
          <Route path="/surveyevaluationb" element={<SurveyEvaluationb />} />
          <Route path="/thankyoumessage" element={<ThankYouMessage />} />
          <Route path="/willrecom" element={<Willrecom />} />
          <Route path="/wherelearn" element={<WhereLearn />} />
          <Route path="/surveyvenue" element={<SurveyVenue />} />
          <Route path="/openended2" element={<OpenEnded2 />} />
          <Route path="/openended1" element={<OpenEnded1 />} />
          <Route path="/howmanyvisits" element={<HowManyVisits />} />
          <Route path="/primaryatt" element={<PrimaryAtt />} />
          <Route path="/rateattraction" element={<RateAttraction />} />
          <Route path="/eventsopen1" element={<EventsOpen1 />} />
          {/* <Route path="/eventsopen2" element={<EventsOpen2 />} /> */}
          <Route path="/attractionsfeedback" element={<AttractionsFeedback />} />
          <Route path="/packagetourfeedback" element={<PackageTourFeedback />} />
          <Route path="/attractionform" element={<AttractionForm />} />
          <Route path="/services2" element={<Services2 />} />
          <Route path="/services1" element={<Services1 />} />
          <Route path="/destinationshoppinglist" element={<DestinationShoppingList />} />
          <Route path="/visitcounteratt" element={<VisitCounterAtt />} />
          <Route path="/travelquestion" element={<TravelQuestion />} />
          <Route path="/travelwith" element={<TravelWith />} />
          <Route path="/traveloptions" element={<TravelOptions />} />
          <Route path="/packagetouritems" element={<PackageTourItems />} />
          <Route path="/packagepaid" element={<PackagePaid />} />
          <Route path="/expensetracker" element={<ExpenseTracker />} />
          <Route path="/percentagesharelist" element={<PercentageShareList />} />
          <Route path="/expensecompanions" element={<ExpenseCompanions />} />
          <Route path="/packtranspo" element={<PackTranspo />} />
          <Route path="/howmanynights" element={<HowManyNights />} />
          <Route path="/accommodationform" element={<AccommodationForm />} />
          <Route path="/bookingform" element={<BookingForm />} />
          <Route path="/wherestayarrival" element={<WhereStayArrival />} />
          <Route path="/wherestaydepart" element={<WhereStayDeparture />} />
          <Route path="/accomodationopen1" element={<AccomodationOpen1 />} />
          <Route path="/accomodationopen2" element={<AccomodationOpen2 />} />
          <Route path="/transportation3" element={<Transportation3 />} />
          <Route path="/transportation1" element={<Transportation1 />} />
          <Route path="/transportation2" element={<Transportation2 />} />
          <Route path="/pprofile2" element={<PProfile2 />} />
          <Route path="/pprofile1" element={<PProfile1 />} />
          <Route path="/proponentlgu" element={<ProponentLgu />} />
          <Route path="/tourismattractionstable" element={<TourismAttractionsTable />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/adminsessiondashboard" element={<AdminSessionDashboard />} />
          <Route path="/overallmun" element={<OverallMun />} />
          <Route path="/overallbarangay" element={<OverallBarangay />} />
          <Route path="/overalltopic" element={<OverallSurveyTopic />} />
          <Route path="/overallone" element={<OverallOneBarangay />} />
          <Route path="/tmgraph" element={<TMGraph />} />

        </Routes>
      </Router>

    </LanguageProvider>);
};

export default AppRoutes;