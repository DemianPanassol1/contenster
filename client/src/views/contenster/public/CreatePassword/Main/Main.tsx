import React from 'react';

const Main: React.FC = () => {
  return (
    <div>
      <h1>Create Password</h1>
      <form>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
          />
        </div>
        <button type="submit">Create Password</button>
      </form>
    </div>
  );
};

export default Main;
