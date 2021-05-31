import {Component, OnInit} from '@angular/core';
import { MatSnackBar } from '@angular/material';
import {Web3Service} from '../util/web3.service';
import Web3 from 'web3';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';

declare var require;
declare let window: any;
const factory_artifacts = require('../../../build/contracts/Factory.json');
const auction_artifacts = require('../../../build/contracts/Auction.json');
const metacoin_artifacts = require('../../../build/contracts/MetaCoin.json');


@Component({
  selector: 'app-factory',
  templateUrl: './factory.component.html',
  styleUrls: ['./factory.component.css']
})

export class FactoryComponent implements OnInit {
  // fields for loading account
  myAccount;
  web3Test;
  accountsTest;
  networkIdTest;
  // Factory
  networkDataTest;
  marketplaceTest;
  // Auction
  networkDataTestAuction;
  marketplaceTestAuction;

  // auctionResult
  createAuctionCallResult; // return address of auction
  auctionOwner;
  factoryAddress;
  bidHistory = [];
  allAuctions = [];
  bidSpecificUser;
  adjudiction;

  profileForm = new FormGroup({
    maxPrice: new FormControl('', Validators.required),
    currency: new FormControl('', Validators.required),
    duration: new FormControl('', Validators.required)
  });

  currenciesArray: any[] = [
    {value: 'Ether'},
    {value: 'Bitcoin'},
  ];

  durationArray: any[] = [
    {value: 10},
    {value: 30},
    {value: 60},
    {value: 90},
  ];

  constructor(private web3Service: Web3Service, private matSnackBar: MatSnackBar,
              private formBuilder: FormBuilder) {
  }

  async ngOnInit() {
    this.loadWeb3();

    this.web3Test = window.web3;
    // Load account
    this.accountsTest = await this.web3Test.eth.getAccounts();
    this.myAccount = this.accountsTest[0];
    this.networkIdTest = await this.web3Test.eth.net.getId();

    this.networkDataTest = factory_artifacts.networks[this.networkIdTest];
    this.marketplaceTest = new this.web3Test.eth.Contract(factory_artifacts.abi, this.networkDataTest.address);

    this.networkDataTestAuction = auction_artifacts.networks[this.networkIdTest];
    this.marketplaceTestAuction = new this.web3Test.eth.Contract(auction_artifacts.abi, this.networkDataTestAuction.address);
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else {
      window.web3 = new Web3(window.web3.currentProvider);
    }
  }


  async createAuction() {
    if (this.networkDataTest) {

      const createAuctionCall = await this.marketplaceTest.methods.createAuction(this.profileForm.get('maxPrice').value,
        this.profileForm.get('currency').value.toString(), 'ipfs://QmPFzAH4RCEV1Jzpe5URdaxfGVhMBVKLCnYAVjpQYfruWd' , 'ipfs://QmPFzAH4RCEV1Jzpe5URdaxfGVhMBVKLCnYAVjpQYfruWdaaaaaaaaaaa',
        this.profileForm.get('duration').value.value).call();
      this.createAuctionCallResult = createAuctionCall;

      setTimeout(this.getCurrentAuction.bind(this, this.createAuctionCallResult.toString()), 5000); // changer format createAuctionCall
      setTimeout(this.getCurrentFactoryAddress.bind(this, this.createAuctionCallResult.toString()),
        5000);
      setTimeout(this.getBidHistory.bind(this, this.createAuctionCallResult.toString()),
        7000);

      setTimeout(this.placeBid.bind(this, this.createAuctionCallResult.toString()),
        5000);



    } else {
      console.log('Marketplace contract not deployed to detected network.');
      // window.alert('Marketplace contract not deployed to detected network.');
    }
  }

  async getAllAuctions() { // NO
    if (this.networkDataTestAuction) {
      this.marketplaceTest = new this.web3Test.eth.Contract(factory_artifacts.abi, this.networkDataTest.address);
      this.allAuctions = await this.marketplaceTest.methods.getAllAuctions().call();
      console.log(this.allAuctions);
    }
  }

  async placeBid() {
    if (this.networkDataTestAuction) {
      console.log('rentre placeBid');
      this.marketplaceTest = new this.web3Test.eth.Contract(factory_artifacts.abi, this.networkDataTest.address);
      await this.marketplaceTestAuction.methods.placeBid(60, 1).call();
      console.log(await this.marketplaceTestAuction.methods.placeBid(60, 1).call());
    }
  }

  /*
    GETTER
   */

  async getCurrentAuction(addressOfAuction) {
    if (this.networkDataTestAuction) {
      this.auctionOwner = await this.marketplaceTestAuction.methods.getAuctionOwner().call();
      return this.auctionOwner;
    }
  }

  async getCurrentFactoryAddress() {
    if (this.networkDataTestAuction) {
      this.factoryAddress = await this.marketplaceTestAuction.methods.getFactoryAddress().call();
      return this.factoryAddress;
    }
  }

  async getBidHistory() {
    if (this.networkDataTestAuction) {
      this.bidHistory = await this.marketplaceTestAuction.methods.getBidHistory().call();
      console.log('History of bids: ');
      console.log(this.bidHistory);
      return this.bidHistory;
    }
  }

  async adjudicate() {
    if (this.networkDataTestAuction) {
      this.adjudiction = await this.marketplaceTestAuction.methods.adjudicate().call();
      console.log('this.adjudiction');
      console.log(this.adjudiction);
      return this.adjudiction;
    }
  }
}

