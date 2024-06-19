Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", `${Cypress.env("BACKEND")}/login`, {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem("loggedBlogappUser", JSON.stringify(body));
    cy.visit("http://localhost:5173");
  });
});

Cypress.Commands.add("createBlog", ({ name, title, url }) => {
  cy.request({
    url: `${Cypress.env("BACKEND")}/blogs`,
    method: "POST",
    body: { name, title, url },
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("loggedBlogappUser")).token}`,
    },
  });

  cy.visit("");
});
