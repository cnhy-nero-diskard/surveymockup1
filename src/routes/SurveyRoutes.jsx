import React from 'react';
import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import LanguageSelector from '../pages/survey/languageselector/LanguageSelector';
import Residence1 from '../pages/survey/residence1/Residence1';
import MainPurpose from '../pages/survey/mainpurpose/MainPurpose';
import VisitFrequencyForm from '../pages/survey/visitfrequencyform/VisitFrequencyForm';
import SurveyConsent from '../pages/survey/surveyconsent/SurveyConsent';
import Form from '../pages/survey/form/Form';
import Greetings from '../pages/survey/greetings/Greetings';
import BranchingSelect from '../pages/survey/branchingselect/BranchingSelect';
import Page1 from '../pages/survey/page1/Page1';
import SurveyEvaluation05 from '../pages/survey/surveyevaluation1/SurveyEvaluation05';
import SurveyEvaluationb from '../pages/survey/surveyevaluation2/SurveyEvaluationb';
import ThankYouMessage from '../pages/survey/thanku/ThankYouMessage';
import Willrecom from '../pages/survey/reccommevent/Willrecom';
import WhereLearn from '../pages/survey/wherelearn/WhereLearn';
import SurveyVenue from '../pages/survey/surveyvenue/SurveyVenue';
import OpenEnded2 from '../pages/survey/OpenEnded2LIfestyle/OpenEndedLifestyle';
import OpenEndedHotel from '../pages/survey/OpenEnded1Hotel/OpenEndedHotel';
import HowManyVisits from '../pages/survey/events1/HowManyVisits';
import PrimaryAtt from '../pages/survey/events2/PrimaryAtt';
import RateAttraction from '../pages/survey/events3/RateAttraction';
import EventsOpen1 from '../pages/survey/eventsopenended/EventsOpen1';
import AttractionsFeedback from '../pages/survey/eventsopenended2/AttractionsFeedback';
import PackageTourFeedback from '../pages/survey/eventsopenended2/PackageTourFeedback';
import AttractionForm from '../pages/survey/events4/AttractionForm';
import Services2 from '../pages/survey/services2/Services2';
import Services1 from '../pages/survey/services1/Services1';
import DestinationShoppingList from '../pages/survey/services3/DestinationShoppingList';
import VisitCounterAtt from '../pages/survey/hmvisits/VisitCounterAtt';
import TravelQuestion from '../pages/survey/travelquestion/TravelQuestion';
import TravelWith from '../pages/survey/travelwith/TravelWith';
import TravelOptions from '../pages/survey/packagetour1/TravelOptions';
import PackageTourItems from '../pages/survey/packageitems/PackageTourItems';
import PackagePaid from '../pages/survey/packagetourpaid/PackagePaid';
import ExpenseTracker from '../pages/survey/packagerecall/ExpenseTracker';
import PercentageShareList from '../pages/survey/packagerecall2/PercentageShareList';
import ExpenseCompanions from '../pages/survey/expensecompanion/ExpenseCompanions';
import PackTranspo from '../pages/survey/packTranspo/PackTranspo';
import HowManyNights from '../pages/survey/accomodation1/HowManyNights';
import AccommodationForm from '../pages/survey/accomodation2/AccomodationForm';
import BookingForm from '../pages/survey/accomodation3/BookingForm';
import WhereStayArrival from '../pages/survey/accomodation4/WhereStay_arrival';
import WhereStayDeparture from '../pages/survey/accomodation4/WhereStay_depart';
import AccomodationOpen1 from '../pages/survey/accomodation5o/AccomodationOpen1';
import AccomodationOpen2 from '../pages/survey/accomodation6o/AccomodationOpen2';
import Transportation3 from '../pages/survey/transportation3/Transportation3';
import Transportation1 from '../pages/survey/transportation1/Transportation1';
import Transportation2 from '../pages/survey/transportation2/Transportation2';
import PProfile2 from '../pages/survey/personalprofile2/PProfile2';
import PProfile1 from '../pages/survey/personalprofile1/PProfile1';
import ProponentLgu from '../pages/survey/proponentlgu/ProponentLgu';
import { LanguageProvider } from '../components/partials/LanguageContext';
import styled from 'styled-components';
import SurveyStepGuard from './SurveyStepGuard';
import NotFound from '../components/admin/fallback/NotFound';
import { components } from 'react-select';
// Define the button-to-route mapping
export const buttonRoutes = [
    { label: 'Language Selector', path: 'languageselector' },
    { label: 'Survey Consent', path: 'surveyconsent' },
    { label: 'Residence 1', path: 'residence1' },
    { label: 'Main Purpose', path: 'mainpurpose' },
    { label: 'Visit Frequency Form', path: 'visitfrequencyform' },
    { label: 'Form', path: 'form' },
    { label: 'Greetings', path: 'greetings' },
    { label: 'Branching Select', path: 'branchingselect' },
    { label: 'Page 1', path: 'page1' },
    { label: 'Survey Evaluation VERSION1', path: 'surveyevaluation05' },
    { label: 'Survey Evaluation VERSION2', path: 'surveyevaluationb' },
    { label: 'Thank You Message', path: 'thankyoumessage' },
    { label: 'Will Recommend', path: 'willrecom' },
    { label: 'Where Learn', path: 'wherelearn' },
    { label: 'Survey Venue', path: 'surveyvenue' },
    { label: 'Open Ended Lifestyle', path: 'openended2' },
    { label: 'Open Ended 1', path: 'openended1' },
    { label: '(DUPLICATE)How Many Visits', path: 'howmanyvisits' },
    { label: 'Primary Attraction', path: 'primaryatt' },
    { label: 'Rate Attraction', path: 'rateattraction' },
    { label: 'Events Open 1', path: 'eventsopen1' },
    { label: 'Attractions Feedback', path: 'attractionsfeedback' },
    { label: 'Package Tour Feedback', path: 'packagetourfeedback' },
    { label: 'Attraction Form', path: 'attractionform' },
    { label: 'Services 2', path: 'services2' },
    { label: 'Services 1', path: 'services1' },
    { label: 'Destination Shopping List', path: 'destinationshoppinglist' },
    { label: 'Visit Counter', path: 'visitcounteratt' },
    { label: 'Travel Question', path: 'travelquestion' },
    { label: 'Travel With', path: 'travelwith' },
    { label: 'Travel Options', path: 'traveloptions' },
    { label: 'Package Tour Items', path: 'packagetouritems' },
    { label: 'Package Paid', path: 'packagepaid' },
    { label: 'Expense Tracker', path: 'expensetracker' },
    { label: 'Percentage Share List', path: 'percentagesharelist' },
    { label: '(DUPLICATE)Expense Companions', path: 'expensecompanions' },
    { label: 'Pack Transpo', path: 'packtranspo' },
    { label: 'How Many Nights', path: 'howmanynights' },
    { label: 'Accommodation Form', path: 'accommodationform' },
    { label: 'Booking Form', path: 'bookingform' },
    { label: 'Where Stay Arrival', path: 'wherestayarrival' },
    { label: '(IGNORE)Where Stay Departure', path: 'wherestaydepart' },
    { label: 'Accommodation Open 1', path: 'accomodationopen1' },
    { label: 'Accommodation Open 2', path: 'accomodationopen2' },
    { label: 'Transportation 3', path: 'transportation3' },
    { label: 'Transportation 1', path: 'transportation1' },
    { label: 'Transportation 2', path: 'transportation2' },
    { label: 'Personal Profile 2', path: 'pprofile2' },
    { label: 'Personal Profile 1', path: 'pprofile1' },
    { label: 'Proponent LGU', path: 'proponentlgu' },

];
// Styled Components
const ButtonGrid = () => {
    const navigate = useNavigate();



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


// export const sroutes = [
//     { label: 'Page 1', path: 'page1', component: Page1},
//     { label: 'Language', path: 'languageselector', component: LanguageSelector},
//     { label: 'Survey Consent', path: 'surveyconsent', component: SurveyConsent},
//     { label: 'Greetings', path: 'greetings', component: Greetings},
//     { label: 'Residence 1', path: 'residence1', component: Residence1},
//     { label: 'Main Purpose', path: 'mainpurpose', component: MainPurpose},
//     { label: 'Visit Frequency Form', path: 'visitfrequencyform', component: VisitFrequencyForm},
//     { label: 'Form', path: 'form', component: Form},
//     { label: 'Branching Select', path: 'branchingselect', component: BranchingSelect},
//     { label: 'Survey Evaluation VERSION1', path: 'surveyevaluation05', component: SurveyEvaluation05},
//     // { label: 'Survey Evaluation VERSION2', path: 'surveyevaluationb', component: },
//     { label: 'Thank You Message', path: 'thankyoumessage', component: ThankYouMessage},
//     { label: 'Will Recommend', path: 'willrecom', component: Willrecom},
//     { label: 'Where Learn', path: 'wherelearn', component: WhereLearn},
//     { label: 'Survey Venue', path: 'surveyvenue', component: SurveyVenue},
//     { label: 'Open Ended Lifestyle', path: 'openended2', component: OpenEnded2},
//     { label: 'Open Ended 1', path: 'openended1', component: OpenEndedHotel},
//     // { label: '(DUPLICATE)How Many Visits', path: 'howmanyvisits', component: },
//     { label: 'Primary Attraction', path: 'primaryatt', component: PrimaryAtt},
//     { label: 'Rate Attraction', path: 'rateattraction', component: RateAttraction},
//     { label: 'Events Open 1', path: 'eventsopen1', component: EventsOpen1},
//     { label: 'Attractions Feedback', path: 'attractionsfeedback', component: AttractionsFeedback},
//     { label: 'Package Tour Feedback', path: 'packagetourfeedback', component: PackageTourFeedback},
//     { label: 'Attraction Form', path: 'attractionform', component: AttractionForm},
//     { label: 'Services 2', path: 'services2', component: Services2},
//     { label: 'Services 1', path: 'services1', component: Services1},
//     { label: 'Destination Shopping List', path: 'destinationshoppinglist', component: DestinationShoppingList},
//     { label: 'Visit Counter', path: 'visitcounteratt', component: VisitCounterAtt},
//     { label: 'Travel Question', path: 'travelquestion', component: TravelQuestion},
//     { label: 'Travel With', path: 'travelwith', component: TravelWith},
//     { label: 'Travel Options', path: 'traveloptions', component: TravelOptions},
//     { label: 'Package Tour Items', path: 'packagetouritems', component: PackageTourItems},
//     { label: 'Package Paid', path: 'packagepaid', component: PackagePaid},
//     { label: 'Expense Tracker', path: 'expensetracker', component: ExpenseTracker},
//     { label: 'Percentage Share List', path: 'percentagesharelist', component: PercentageShareList},
//     // { label: '(DUPLICATE)Expense Companions', path: 'expensecompanions', component: },
//     { label: 'Pack Transpo', path: 'packtranspo', component: PackTranspo},
//     { label: 'How Many Nights', path: 'howmanynights', component: HowManyNights},
//     { label: 'Accommodation Form', path: 'accommodationform', component: AccommodationForm},
//     { label: 'Booking Form', path: 'bookingform', component: BookingForm},
//     { label: 'Where Stay Arrival', path: 'wherestayarrival', component: WhereStayArrival},
//     // { label: '(IGNORE)Where Stay Departure', path: 'wherestaydepart', component: },
//     { label: 'Accommodation Open 1', path: 'accomodationopen1', component: AccomodationOpen1},
//     { label: 'Accommodation Open 2', path: 'accomodationopen2', component: AccomodationOpen2},
//     { label: 'Transportation 3', path: 'transportation3', component: Transportation3},
//     { label: 'Transportation 1', path: 'transportation1', component: Transportation1},
//     { label: 'Transportation 2', path: 'transportation2', component: Transportation2},
//     { label: 'Personal Profile 2', path: 'pprofile2', component: PProfile2},
//     { label: 'Personal Profile 1', path: 'pprofile1', component: PProfile1},
//     { label: 'Proponent LGU', path: 'proponentlgu', component: ProponentLgu},

// ];

const SurveyRoutes = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Navigate to the first route in sroutes when the app loads
        navigate(`/${sroutes[0].path}`);
    }, [navigate]);

    return (
        <LanguageProvider>
            <Routes>
                {/* Dynamically generate survey routes */}
                {sroutes.map((route, index) => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={
                            <SurveyStepGuard
                                route={route}
                                index={index}
                                totalSteps={sroutes.length}
                            />
                        }
                    />
                ))}

                {/* Fallback route */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </LanguageProvider>
    );
};

export default SurveyRoutes;