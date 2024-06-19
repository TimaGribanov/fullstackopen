describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user = {
      username: "tester-cypress",
      password: "testing-cy",
      name: "Tester Cypress",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);

    const other_user = {
      username: "user-cypress",
      password: "using-cy",
      name: "User Cypress Cant Delete",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, other_user);

    cy.visit("");
  });

  it("Login form is shown", function () {
    cy.contains("log in").click();
  });

  it("login succeeds with correct credentials", function () {
    cy.contains("log in").click();

    cy.get("#username").type("tester-cypress");
    cy.get("#password").type("testing-cy");
    cy.get("#login-button").click();

    cy.contains("Tester Cypress logged in");
  });

  describe("When logged in", function () {
    beforeEach(function () {
      // cy.login({ username: 'tester-cypress', password: 'testing-cy' })
      cy.contains("log in").click();

      cy.get("#username").type("tester-cypress");
      cy.get("#password").type("testing-cy");
      cy.get("#login-button").click();

      cy.contains("Tester Cypress logged in");
    });

    it("a blog can be created", function () {
      cy.contains("new blog").click();
      cy.get("#blogTitle").type("Cypress Test Blog");
      cy.get("#blogAuthor").type("Cypress Tester");
      cy.get("#blogUrl").type("/cypress-blog.html");
      cy.get("#createBlogBtn").click();

      cy.contains("Cypress Test Blog");
    });

    describe("and several blogs are available", function () {
      beforeEach(function () {
        cy.login({ username: "tester-cypress", password: "testing-cy" });
        cy.createBlog({
          title: "Blog 1",
          name: "Cypress Tester",
          url: "/test1",
        });
        cy.createBlog({
          title: "Blog 2",
          name: "Cypress Tester",
          url: "/test2",
        });
        cy.createBlog({
          title: "Blog 3",
          name: "Cypress Tester",
          url: "/test3",
        });
      });

      it("a blog can be liked", function () {
        cy.contains("Blog 1").parent().contains("view").click();
        cy.contains("Blog 1").parent().contains("like").click();
        cy.contains("Blog 1").parent().contains("likes 1");
      });

      it("a blog can be deleted by the creator", function () {
        cy.contains("Blog 1").parent().contains("view").click();
        cy.contains("Blog 1").parent().contains("remove").click();
        cy.get("html").should("not.contain", "Blog 1");
      });

      it("other user cannot see the delete button", function () {
        cy.contains("log out").click();
        cy.contains("log in").click();
        cy.get("#username").type("user-cypress");
        cy.get("#password").type("using-cy");
        cy.get("#login-button").click();
        cy.contains("Blog 1").parent().contains("view").click();
        cy.contains("Blog 1").parent().should("not.contain", "remove");
      });

      it("blogs are ordered by likes", function () {
        cy.contains("Blog 3").parent().contains("view").click();
        for (let i = 0; i < 3; i++) {
          cy.contains("Blog 3").parent().contains("like").click();
          cy.contains("Blog 3")
            .parent()
            .contains(`likes ${i + 1}`);
        }
        cy.get(".blogBlock").eq(0).should("contain", "Blog 3");
        cy.get(".blogBlock").eq(1).should("contain", "Blog 1");
      });
    });
  });

  it("fails with wrong credentials", function () {
    cy.contains("log in").click();

    cy.get("#username").type("wrong");
    cy.get("#password").type("wrong");
    cy.get("#login-button").click();

    cy.get(".err")
      .should("contain", "Wrong credentials")
      .and("have.css", "color", "rgb(255, 0, 0)");
  });
});
