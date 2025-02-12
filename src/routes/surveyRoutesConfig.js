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
import OpenEnded1Services from '../pages/survey/OpenEnded1Hotel/OpenEndedHotel';
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
import OpenEndedTranspo from '../pages/survey/OpenEndedTransportation/OpenEndedTranspo';


export const sroutes = [
    { label: 'Language', path: '', component: LanguageSelector, conditionalBlock: 'universal'},
    { label: 'Page 1', path: 'page1', component: Page1, conditionalBlock: 'universal'},
    { label: 'Survey Consent', path: 'surveyconsent', component: SurveyConsent, conditionalBlock: 'universal'},
    { label: 'Gmail Form', path: 'form', component: Form, conditionalBlock: 'universal'},
    { label: 'Greetings', path: 'greetings', component: Greetings, conditionalBlock: 'universal'},
    { label: 'Residence 1', path: 'residence1', component: Residence1, conditionalBlock: 'universal'},
    { label: 'Transportation 1', path: 'transportation1', component: Transportation1, conditionalBlock: 'oprovblock'},
    { label: 'Transportation 2', path: 'transportation2', component: Transportation2, conditionalBlock: 'iprovblock'},
    { label: 'Visit Counter', path: 'visitcounteratt', component: VisitCounterAtt, conditionalBlock: 'universal'},
    { label: 'Main Purpose', path: 'mainpurpose', component: MainPurpose, conditionalBlock: 'universal'},
    { label: 'Visit Frequency Form', path: 'visitfrequencyform', component: VisitFrequencyForm, conditionalBlock: 'universal'},
    { label: 'Travel Question', path: 'travelquestion', component: TravelQuestion, conditionalBlock: 'universal'},
    { label: 'Travel With', path: 'travelwith', component: TravelWith, conditionalBlock: 'universal'},
    
    { label: 'Travel Options', path: 'traveloptions', component: TravelOptions, conditionalBlock: 'universal'},
    { label: 'Package Tour Items', path: 'packagetouritems', component: PackageTourItems, conditionalBlock: 'pkgtour'},
    { label: 'Package Paid', path: 'packagepaid', component: PackagePaid, conditionalBlock: 'pkgtour'},
    { label: 'Package Tour Feedback', path: 'packagetourfeedback', component: PackageTourFeedback, conditionalBlock: 'pkgtour'},
    
    { label: 'Expense Tracker', path: 'expensetracker', component: ExpenseTracker, conditionalBlock: 'universal'},
    { label: 'Percentage Share List', path: 'percentagesharelist', component: PercentageShareList, conditionalBlock: 'perclist'},
    { label: 'Expense Companions', path: 'expensecompanions', component: ExpenseCompanions, conditionalBlock: 'universal'},
    
    { label: 'Branching Select', path: 'branchingselect', component: BranchingSelect, conditionalBlock: 'universal'},
    
    
    { label: 'How Many Nights', path: 'howmanynights', component: HowManyNights, conditionalBlock: 'accom'},
    { label: 'Accommodation Form', path: 'accommodationform', component: AccommodationForm, conditionalBlock: 'yesaccom'},
    { label: 'Where Stay Departure', path: 'wherestayarrival', component: WhereStayArrival, conditionalBlock: 'noaccom'},
    { label: 'Accommodation Open 1', path: 'accomodationopen1', component: AccomodationOpen1, conditionalBlock: 'accom'},
    
    
    { label: 'Primary Attraction', path: 'primaryatt', component: PrimaryAtt, conditionalBlock: 'evatt'},
    
    
    { label: 'Pack Transpo', path: 'packtranspo', component: PackTranspo, conditionalBlock: 'transp'},
    { label: 'Transportation 3', path: 'transportation3', component: Transportation3, conditionalBlock: 'transp'},
    { label: 'Open Ended Transportation', path: 'opentranspo', component: OpenEndedTranspo, conditionalBlock: 'transp'},
    
    
    { label: 'Services 2', path: 'services2', component: Services2, conditionalBlock: 'serv'},
    { label: 'Destination Shopping List', path: 'destshlist', component: DestinationShoppingList, conditionalBlock: 'serv'},
    { label: 'Open Ended 1', path: 'openendedservice', component: OpenEnded1Services, conditionalBlock: 'serv'},
    { label: 'Open Ended Lifestyle', path: 'openendedlifestyle', component: OpenEnded2,conditionalBlock: 'serv'},
    

    { label: 'Survey Evaluation VERSION1', path: 'surveyevaluation05', component: SurveyEvaluation05},
    // { label: 'Survey Evaluation VERSION2', path: 'surveyevaluationb', component: },
    { label: 'Will Recommend', path: 'willrecom', component: Willrecom},
    { label: 'Where Learn', path: 'wherelearn', component: WhereLearn},
    { label: 'Survey Venue', path: 'surveyvenue', component: SurveyVenue},
    // { label: '(DUPLICATE)How Many Visits', path: 'howmanyvisits', component: },
    { label: 'Rate Attraction', path: 'rateattraction', component: RateAttraction},
    { label: 'Events Open 1', path: 'eventsopen1', component: EventsOpen1},
    { label: 'Attractions Feedback', path: 'attractionsfeedback', component: AttractionsFeedback},
    { label: 'Attraction Form', path: 'attractionform', component: AttractionForm},
    { label: 'Services 1', path: 'services1', component: Services1},
    { label: 'Booking Form', path: 'bookingform', component: BookingForm},
    // { label: '(IGNORE)Where Stay Departure', path: 'wherestaydepart', component: },
    { label: 'Accommodation Open 2', path: 'accomodationopen2', component: AccomodationOpen2},
    { label: 'Personal Profile 2', path: 'pprofile2', component: PProfile2},
    { label: 'Personal Profile 1', path: 'pprofile1', component: PProfile1},
    { label: 'Proponent LGU', path: 'proponentlgu', component: ProponentLgu},
    { label: 'Thank You Message', path: 'survey-complete', component: ThankYouMessage},
    
];
