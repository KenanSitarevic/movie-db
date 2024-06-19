/// <reference types="cypress" />
import React from 'react';
import { mount } from 'cypress/react18';
import SearchBar from './SearchBar';
import { GlobalContext } from '../contexts/GlobalContext'; 

let searchMock : Cypress.Agent<sinon.SinonStub>;

describe('SearchBar Component', () => {
  beforeEach(() => {
    searchMock = cy.stub();
    mount(
      <GlobalContext>
        <SearchBar search={searchMock} />
      </GlobalContext>
    );
  });

  it('renders the search input', () => {
    cy.get('[data-test="search-bar"]').should('exist');
  });

  it('updates the search input value and calls search function after debounce', () => {
    const inputText = 'test';

    cy.get('[data-test="search-bar"]').type(inputText);

    // Ensure the input value updates
    cy.get('[data-test="search-bar"]').should('have.value', inputText);

    // Wait for debounce time + some buffer
    cy.wait(1100);

    // Ensure the search function was called with the correct argument
    cy.then(() => {
      expect(searchMock).to.have.been.calledWith(inputText);
    });
  });

  it('does not call search function for short input values', () => {
    const shortInput = 'te';

    cy.get('[data-test="search-bar"]').type(shortInput);

    // Ensure the input value updates
    cy.get('[data-test="search-bar"]').should('have.value', shortInput);

    // Wait for debounce time + some buffer
    cy.wait(1100);

    // Ensure the search function was not called
    cy.then(() => {
      expect(searchMock).not.to.have.been.called;
    });
  });
});
