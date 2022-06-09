import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import cars from './data/cars.json';
import vans from './data/vans.json';

import { Button, Row, Col, Form } from 'react-bootstrap';

const carJson = JSON.parse(JSON.stringify(cars));
const vanJson = JSON.parse(JSON.stringify(vans));


function jsonToOptions(json) {
  let options = [];
  for (var i = 0; i < json.length; i++) {
    options.push({ label: json[i], value: json[i] });
  }
  return options;
}


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Form>
        <Form.Label>Form</Form.Label>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridFirstName">
              <Form.Label>First name</Form.Label>
              <Form.Control placeholder="John" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridLastName">
              <Form.Label>Last name</Form.Label>
              <Form.Control placeholder="Doe" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridAge">
              <Form.Label>Age</Form.Label>
              <Form.Control type="number" placeholder="22" min="18" max="100" id="age" name="age"/>
            </Form.Group>

          </Row>

          <Row className="mb-3">

            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter Email" title="Please give a valid email address" />
            </Form.Group>
          </Row>

          <Row className="mb-3">
          <Form.Group controlId="formGridAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control placeholder="46 Dalhousie Road" />
            </Form.Group>

            <Form.Group controlId="formGridAddress2">
              <Form.Label>County</Form.Label>
              <Form.Control placeholder="Midlothian" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPostcode">
              <Form.Label>Postcode</Form.Label>
              <Form.Control placeholder="EH22 3FR" title="Please enter a valid UK postcode" pattern="([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPhone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control placeholder="EH22 3FR" title="Please enter a valid UK postcode" pattern="([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})" />
            </Form.Group>
          </Row>

          <Form.Group as={Col} controlId="formGridLanguage">
              <Form.Label>Language</Form.Label>
              <Form.Control placeholder="English" />
            </Form.Group>


          <Row className="mb-3">

            <Form.Group as={Col} controlId="formGridType">
              <Form.Label>Vehicle Type</Form.Label>
              <Form.Select defaultValue="Choose...">
                <option>Van</option>
                <option>Car</option>
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCar">
              <Form.Label>Vehicle (Car)</Form.Label>
              <Form.Select defaultValue="Choose...">
                {jsonToOptions(carJson).map(item => (
                  <option key={item.value} value={item.value}>{item.label}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridVan">
              <Form.Label>Vehicle (Van)</Form.Label>
              <Form.Select defaultValue="Choose...">
                {jsonToOptions(vanJson).map(item => (
                  <option key={item.value} value={item.value}>{item.label}</option>
                ))}
              </Form.Select>
            </Form.Group>

          </Row>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>

      </header>
    </div>
  );
}


export default App;
