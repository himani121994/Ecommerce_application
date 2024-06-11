import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBBtn
} from 'mdb-react-ui-kit';
import { FaInstagram, FaTwitter } from "react-icons/fa";
import { IoLogoFacebook } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import { PiLinkedinLogoDuotone } from "react-icons/pi";
import './footer.css'; // Import custom CSS

export default function App() {
  return (
    <MDBFooter className='text-center text-white bg-dark'>
      <MDBContainer className='p-4'>
        <section className='mb-4'>
          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <FaInstagram style={{fontSize:"28px"}}/>
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <IoLogoFacebook style={{fontSize:"28px"}}/>
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <FcGoogle style={{fontSize:"28px"}}/>
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <BsGithub style={{fontSize:"28px"}}/>
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <PiLinkedinLogoDuotone style={{fontSize:"28px"}}/>
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <FaTwitter style={{fontSize:"28px"}}/>
          </MDBBtn>
        </section>

        <section>
          <form action=''>
            <div className='row align-items-center justify-content-center'>
              <div className='col-sm-3'></div>
              <div className='col-auto' style={{margin:"-11px -90px 0px 0px"}}>
                <p className='pt-2'>
                  <strong>Sign up for our newsletter</strong>
                </p>
              </div>

              <div className='col-auto' style={{margin:"0px 0px 0px -180px"}}>
                <input type='email' placeholder='Email address' className='form-control mb-4' />
              </div>

              <div className='col-auto' style={{margin:"0px 0px 0px -220px"}}>
                <MDBBtn outline color='light' type='submit'>
                  Subscribe
                </MDBBtn>
              </div>
              <div className='col-sm-3'></div>
            </div>
          </form>
        </section>

        <div className='text-content' style={{marginTop:"-30px"}}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum repellat quaerat
            voluptatibus placeat nam, commodi optio pariatur est quia magnam eum harum corrupti dicta, aliquam
            sequi voluptate quas.
          </p>
        </div>

        <section style={{marginTop:"-30px"}}>
          <div className='row justify-content-center'>
            <div className='col-md-2'>
              <h5 className='text-uppercase'>Links</h5>
              <ul className='list-unstyled mb-0'>
                <li><a href='#!' className='text-white'>Link 1</a></li>
                <li><a href='#!' className='text-white'>Link 2</a></li>
                <li><a href='#!' className='text-white'>Link 3</a></li>
                <li><a href='#!' className='text-white'>Link 4</a></li>
              </ul>
            </div>

            <div className='col-md-2'>
              <h5 className='text-uppercase'>Links</h5>
              <ul className='list-unstyled mb-0'>
                <li><a href='#!' className='text-white'>Link 1</a></li>
                <li><a href='#!' className='text-white'>Link 2</a></li>
                <li><a href='#!' className='text-white'>Link 3</a></li>
                <li><a href='#!' className='text-white'>Link 4</a></li>
              </ul>
            </div>

            <div className='col-md-2'>
              <h5 className='text-uppercase'>Links</h5>
              <ul className='list-unstyled mb-0'>
                <li><a href='#!' className='text-white'>Link 1</a></li>
                <li><a href='#!' className='text-white'>Link 2</a></li>
                <li><a href='#!' className='text-white'>Link 3</a></li>
                <li><a href='#!' className='text-white'>Link 4</a></li>
              </ul>
            </div>
          </div>
        </section>
      </MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2020 Copyright:
        <a className='text-white' href='https://mdbootstrap.com/'>
          MDBootstrap.com
        </a>
      </div>
    </MDBFooter>
  );
}
