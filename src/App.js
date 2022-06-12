import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import cars from './data/cars.json';
import vans from './data/vans.json';
import languages from './data/languages.json';

import { useState } from 'react';
import { Button, Row, Col, Form } from 'react-bootstrap';

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

  const [carUser, setCarUser] = useState(false);

  return (

    <div className="App">
        <h1>Registration</h1>
          <Form>
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
                <Form.Control type="number" placeholder="22" min="18" max="100" />
              </Form.Group>
            </Row>


            <Row className="mb-6">

              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="schools@edinburghcollege.ac.uk" title="Please give a valid email address" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridLanguage">
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
              <Form.Group controlId="formGridAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control placeholder="46 Dalhousie Road" />
                <Form.Text className="text-muted">
                  First line of your address
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formGridAddress2">
                <Form.Label>County</Form.Label>
                <Form.Control placeholder="Midlothian" />
              </Form.Group>
            </Row>

            <Row className="mb-6">
              <Form.Group as={Col} controlId="formGridPostcode">
                <Form.Label>Postcode</Form.Label>
                <Form.Control placeholder="EH22 3FR" title="Please enter a valid UK postcode" pattern="([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPhone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control placeholder="0131 297 9000" />
              </Form.Group>

            </Row>




            <Row className="mb-3">

              <Form.Group as={Col} controlId="formGridType">
                <Form.Label>Vehicle Type</Form.Label>
                <Form.Select defaultValue="Choose..." onChange={e => {
                  setCarUser(e.target.value === "Car");
                }}>
                  <option>Van</option>
                  <option>Car</option>
                </Form.Select>
                <Form.Text className="text-muted">
                  Please select the relevant vehicle type
                </Form.Text>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridVehicle">
                <Form.Label>{carUser ? "Car Model" : "Van Model"}</Form.Label>
                <Form.Select defaultValue="Choose...">

                  {jsonToOptions(carUser ? carJson : vanJson).map(item => (
                    <option key={item.value} value={item.value}>{item.label}</option>
                  ))}

                </Form.Select>
                <Form.Text className="text-muted">
                  Please select the relevant vehicle model
                </Form.Text>
              </Form.Group>
            </Row>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
    </div>
  );
}


export default App;
