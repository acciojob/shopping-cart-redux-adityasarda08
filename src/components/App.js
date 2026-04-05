const App = () => (
  <Provider store={store}>
    <div>

      {/* 1st child */}
      <Navbar />

      {/* 2nd child (IMPORTANT WRAPPER) */}
      <div>
        <ProductPanel />
      </div>

      {/* 3rd child */}
      <CartPanel />

    </div>
  </Provider>
);