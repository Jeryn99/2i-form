import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import cars from './data/cars.json';
import vans from './data/vans.json';
import languages from './data/languages.json';

import { useState } from 'react';
import { Button, Row, Col, Form, Modal, Alert, Toast , ToastContainer} from 'react-bootstrap';

const carJson = JSON.parse(JSON.stringify(cars));
const vanJson = JSON.parse(JSON.stringify(vans));
const languagesJson = JSON.parse(JSON.stringify(languages));

function jsonToOptions(json) {
  let options = [];
  for (var i = 0; i < json.length; i++) {
    options.push({ label: json[i], value: json[i] });
  }
  return options;
}


function App() {

  // Modal
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  // User Data
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(22);
  const [addressLine, setAddressLine] = useState('');
  const [county, setCounty] = useState('');
  const [postcode, setPostcode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [useCar, setUsesCar] = useState(null);
  const [vehicleModel, setVehicleModel] = useState('');
  const [language, setLanguage] = useState('');

  // Error Handling
  const [showError, setShow] = useState(false);

  function onHandleFormSubmit(e) {
    e.preventDefault();
    handleShow();
    e.target.reset();
  }

  function closeAndClearData() {
    setFirstName("");
    setLastName("");
    setEmail("");
    setAge(0);
    setAddressLine("");
    setCounty("");
    setPostcode("");
    setPhoneNumber("");
    setUsesCar(true);
    setVehicleModel("");
    setLanguage("");
    handleClose();
  }

  return (

    <div className="App">


      <Alert variant="danger" show={showError} onClose={() => setShow(false)}>
        <Alert.Heading>Invalid Input Detected!</Alert.Heading>
        {
          <p>Please check your inputs for errors.</p>
        }
      </Alert>
      <h1>Registration</h1>

      <Form onSubmit={onHandleFormSubmit}>

        <Row className="mb-3">


          <Form.Group as={Col} controlId="formGridFirstName">
            <Form.Label>First name</Form.Label>
            <Form.Control placeholder="John" value={firstName} onChange={e => { setFirstName(e.target.value) }} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridLastName">
            <Form.Label>Last name</Form.Label>
            <Form.Control placeholder="Doe" value={lastName} onChange={e => { setLastName(e.target.value) }} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridAge">
            <Form.Label>Age</Form.Label>
            <Form.Control type="number" placeholder="22" min="18" max="100" value={age} onChange={e => {
              setShow(e.target.value < 18 || e.target.value > 100);
              setAge(e.target.value)
            }} />
          </Form.Group>
        </Row>


        <Row className="mb-6">

          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="schools@edinburghcollege.ac.uk" title="Please give a valid email address" value={email} onChange={e => {
              setEmail(e.target.value);
            }} />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridLanguage" value={language} onChange={e => { setLanguage(e.target.value) }}>
            <Form.Label>Language</Form.Label>
            <Form.Select defaultValue="Choose...">
              {jsonToOptions(languagesJson).map(item => (
                <option key={item.value} value={item.value}>{item.label}</option>
              ))}
            </Form.Select>
            <Form.Text className="text-muted">
              Please select your choosen language
            </Form.Text>
          </Form.Group>

        </Row>

        <Row className="mb-6">
          <Form.Group controlId="formGridAddress" value={addressLine} onChange={e => { setAddressLine(e.target.value) }}>
            <Form.Label>Address</Form.Label>
            <Form.Control placeholder="46 Dalhousie Road" />
            <Form.Text className="text-muted">
              First line of your address
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formGridAddress2" value={county} onChange={e => { setCounty(e.target.value) }}>
            <Form.Label>County</Form.Label>
            <Form.Control placeholder="Midlothian" />
          </Form.Group>
        </Row>

        <Row className="mb-6">
          <Form.Group as={Col} controlId="formGridPostcode" value={postcode} onChange={e => { setPostcode(e.target.value) }}>
            <Form.Label>Postcode</Form.Label>
            <Form.Control placeholder="EH22 3FR" title="Please enter a valid UK postcode" pattern="([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPhone" value={phoneNumber} onChange={e => { setPhoneNumber(e.target.value) }}>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control placeholder="0131 297 9000" />
          </Form.Group>

        </Row>




        <Row className="mb-3">

          <Form.Group as={Col} controlId="formGridType">
            <Form.Label>Vehicle Type</Form.Label>
            <Form.Select defaultValue="Choose..." onChange={e => {
              setUsesCar(e.target.value === "Car");
            }}>
              <option>Van</option>
              <option>Car</option>
            </Form.Select>
            <Form.Text className="text-muted">
              Please select the relevant vehicle type
            </Form.Text>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridVehicle" value={vehicleModel} onChange={e => { setVehicleModel(e.target.value) }}>
            <Form.Label>{useCar ? "Car Model" : "Van Model"}</Form.Label>
            <Form.Select defaultValue="Choose...">

              {jsonToOptions(useCar ? carJson : vanJson).map(item => (
                <option key={item.value} value={item.value}>{item.label}</option>
              ))}

            </Form.Select>
            <Form.Text className="text-muted">
              Please select the relevant vehicle model
            </Form.Text>
          </Form.Group>
        </Row>

        <Button variant="primary" name="submit" type="submit">
          Submit
        </Button>
      </Form>


      <Modal
        show={showModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Successfully Registered! ({firstName + " " + lastName})</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Name: {firstName + " " + lastName}</p>
          <p>Age: {age}</p>
          <p>Email: {email}</p>
          <p>Language: {language}</p>
          <p>Address: {addressLine}</p>
          <p>County: {county}</p>
          <p>Postcode: {postcode}</p>
          <p>Phone Number: {phoneNumber}</p>
          <p>Vehicle Type: {useCar ? "Car" : "Van"}</p>
          <p>Vehicle Model: {vehicleModel}</p>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" name='close' onClick={closeAndClearData}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    </div >
  );
}


export default App;
