import {expect, use} from 'chai';  
import chaiHttp from 'chai-http';

const chai = use(chaiHttp);
const request = chai.request.execute;

export {expect, request};