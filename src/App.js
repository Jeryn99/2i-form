import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import cars from './data/cars.json';
import vans from './data/vans.json';
import languages from './data/languages.json';

import { useState } from 'react';
import { Button, Row, Col, Form, Modal } from 'react-bootstrap';

import BootstrapSwitchButton from 'bootstrap-switch-button-react'

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


  // Application 
  const [darkMode, setDarkMode] = useState(true);


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
  const [useCar, setUsesCar] = useState(true);
  const [vehicleModel, setVehicleModel] = useState('');
  const [language, setLanguage] = useState('');


  // Form Validation
  const [validated, setValidated] = useState(false);


  function onHandleFormSubmit(e) {

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    console.log(form.checkValidity());

    setValidated(true)

    if (form.checkValidity()) {
      handleShow();
      e.preventDefault();
    }

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

    window.location.reload(false);


  }

  return (

    <div className={darkMode ? "App_DarkMode" : "App_LightMode"}>

      <BootstrapSwitchButton onlabel="Dark Mode" width={100} offlabel="Light Mode" onstyle="dark" offstyle="secondary" checked={darkMode} onChange={(checked) => { setDarkMode(checked); }} size="xs" />

      <h1>Registration</h1>

      <Form noValidate validated={validated} onSubmit={onHandleFormSubmit}>

        <Row className="mb-3">

          <Form.Group as={Col} controlId="formGridFirstName">
            <Form.Label>First name</Form.Label>
            <Form.Control placeholder="John" value={firstName} onChange={e => { setFirstName(e.target.value) }} />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridLastName">
            <Form.Label>Last name</Form.Label>
            <Form.Control placeholder="Doe" value={lastName} onChange={e => { setLastName(e.target.value) }} />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridAge">
            <Form.Label>Age</Form.Label>
            <Form.Control type="number" placeholder="22" min="18" max="100" value={age} onChange={e => {
              setAge(e.target.value)
            }} />
            <Form.Control.Feedback type="invalid"> Invalid age! (18 - 100)</Form.Control.Feedback>
          </Form.Group>
        </Row>


        <Row className="mb-6">

          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="schools@edinburghcollege.ac.uk" title="Please give a valid email address" value={email} onChange={e => { setEmail(e.target.value); }} />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            <Form.Control.Feedback type="invalid"> Please enter a valid email address!</Form.Control.Feedback>
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
            <Form.Control required placeholder="46 Dalhousie Road" />
            <Form.Text className="text-muted">
              First line of your address
            </Form.Text>
            <Form.Control.Feedback type="invalid"> Please provide the first line of your address!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formGridAddress2" value={county} onChange={e => { setCounty(e.target.value) }}>
            <Form.Label>County</Form.Label>
            <Form.Control required placeholder="Midlothian" />
            <Form.Control.Feedback type="invalid"> Please enter your county!</Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-6">
          <Form.Group as={Col} controlId="formGridPostcode" value={postcode} onChange={e => { setPostcode(e.target.value) }}>
            <Form.Label>Postcode</Form.Label>
            <Form.Control required placeholder="EH22 3FR" title="Please enter a valid UK postcode" pattern="([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})" />
            <Form.Control.Feedback type="invalid"> Please enter a valid postcode!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPhone" value={phoneNumber} onChange={e => { setPhoneNumber(e.target.value) }}>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control required placeholder="0131 297 9000" />
            <Form.Control.Feedback type="invalid"> Please enter a valid phone number!</Form.Control.Feedback>
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
