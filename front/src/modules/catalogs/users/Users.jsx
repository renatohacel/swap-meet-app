const Users = () => {
  return (
    <>
      <h1 className="text-primary text-3xl sm:text-5xl font-bold mb-5">USUARIOS</h1>
      <hr className="mb-12 text-primary/60 border-1" />
      <input
        type="text"
        name="search"
        placeholder="Buscar"
        className="rounded-md p-2 outline-2 outline-secondary/100 text-primary font-semibold"
      />
    </>
  );
};

export default Users;
