import React from 'react';
import { useNavigate } from 'react-router-dom';

import PageHeader from '../layouts/PageHeader';
import PageLayout from '../layouts/PageLayout';

function ContactUs() {
	const nav = useNavigate();
	const submitHandler = (e) => {
		e.preventDefault();
		nav('/');
	};
	return (
		<PageLayout>
			<div className='page-content'>
				<PageHeader desc={false} pageTitle='Contact Us' />
				<section className='content-inner contact-form-wraper style-1'>
					<div className='container'>
						<div className='row align-items-center'>
							<div className='col-xl-5 col-lg-5 m-b30'>
								<div className='info-box'>
									<div className='info'>
										<h2>Contact Information</h2>
										<p className='font-18'>
											Fill up the form and our team will get back to you within
											24 hours.
										</p>
									</div>

									<div className='widget widget_about'>
										<div className='widget widget_getintuch'>
											<ul>
												<li>
													<i className='fa fa-phone'></i>
													<span>
														+971561791590
														<br />
														+971563851170
													</span>
												</li>
												<li>
													<i className='fa fa-envelope'></i>
													<span>
														info@mothercoin.global <br />
														suport@mothercoin.global
													</span>
												</li>
												<li>
													<i className='fas fa-map-marker-alt'></i>
													<span>
														United Arab Emirate <br />
														Deira, Dubai
													</span>
												</li>
											</ul>
										</div>
									</div>

									<div className='social-box dz-social-icon style-3'>
										<h6>Our Socials</h6>
										<ul className='social-icon'>
											<li>
												<a
													className='social-btn'
													target='_blank'
													rel='noreferrer'
													href='https://facebook.com/mothercoin'
												>
													<i className='fa-brands fa-facebook-f'></i>
												</a>
											</li>
											<li>
												<a
													className='social-btn'
													target='_blank'
													rel='noreferrer'
													href='https://instragram.com/mothercoin-motherwallet'
												>
													<i className='fa-brands fa-instagram'></i>
												</a>
											</li>
											<li>
												<a
													className='social-btn'
													target='_blank'
													rel='noreferrer'
													href='https://twitter.com/MotherCoin7'
												>
													<i className='fa-brands fa-twitter'></i>
												</a>
											</li>
											<li>
												<a
													className='social-btn'
													target='_blank'
													rel='noreferrer'
													href='https://www.youtube.com/@motherCoin_MotherWallet'
												>
													<i className='fab fa-youtube'></i>
												</a>
											</li>
										</ul>
									</div>
								</div>
							</div>

							<div className='col-xl-7 col-lg-7'>
								<div className='contact-box'>
									<div className='card'>
										<div className='card-body'>
											<div className='mb-4'>
												<h2 className='mb-0'>Get In touch</h2>
												<p className='mb-0 font-18 text-primary'>
													We are here for you. How we can help?
												</p>
											</div>
											<form
												className='dzForm'
												onSubmit={(e) => submitHandler(e)}
											>
												<div className='dzFormMsg'></div>
												<input
													type='hidden'
													className='form-control'
													name='dzToDo'
													value='Contact'
												/>

												<div className='row'>
													<div className='mb-3 col-xl-6 mb-md-4'>
														<input
															name='dzFirstName'
															type='text'
															className='form-control'
															placeholder='First Name'
														/>
													</div>
													<div className='mb-3 col-xl-6 mb-md-4'>
														<input
															name='dzLastName'
															type='text'
															className='form-control'
															placeholder='Last Name'
														/>
													</div>
													<div className='mb-3 col-xl-6 mb-md-4'>
														<input
															name='dzEmail'
															type='text'
															className='form-control'
															placeholder='Email Address'
														/>
													</div>
													<div className='mb-3 col-xl-6 mb-md-4'>
														<input
															name='dzPhoneNumber'
															type='text'
															className='form-control'
															placeholder='Phone No.'
														/>
													</div>
													<div className='mb-3 col-xl-12 mb-md-4'>
														<textarea
															name='dzMessage'
															className='form-control'
															placeholder='Message'
														></textarea>
													</div>
													{/* <div className="mb-3 col-xl-12 mb-md-4">
                                                        <div className="g-recaptcha" data-sitekey="6LefsVUUAAAAADBPsLZzsNnETChealv6PYGzv3ZN" data-callback="verifyRecaptchaCallback" data-expired-callback="expiredRecaptchaCallback"></div>
                                                        <input className="form-control d-none" style="display:none;" data-recaptcha="true"  data-error="Please complete the Captcha" />
                                                    </div> */}
													<div className='col-xl-12'>
														<button
															name='submit'
															type='submit'
															value='Submit'
															className='btn btn-primary'
														>
															Submit Now
														</button>
													</div>
												</div>
											</form>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</PageLayout>
	);
}
export default ContactUs;
