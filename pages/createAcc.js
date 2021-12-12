const Form = ({ children, getData }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (getData) {
          let data = {};
          Array.from(e.target.elements).forEach(
            (x) => (data[x.name] = x.value)
          );
          delete data["_"];
          getData(data);
        }
      }}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 15,
          width: 500,
          boxShadow: "0 0 8px black",
          padding: "50px",
        }}
      >
        {children}
        <button
          type="submit"
          name="_"
          style={{ marginTop: 10, padding: 8, cursor: "pointer" }}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

const FormItem = ({ label, name, value }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <label htmlFor={name}>{label}:</label>
      <input name={name} type="text" />
    </div>
  );
};

export default function CustomForm() {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Form getData={console.log}>
        <FormItem label="First Name" name="fName" value="ASDDSADSAD" />
        <FormItem label="Last Name" name="lName" value="ASDDSADSAD111" />
        <FormItem label="Phone Number" name="phoneNum" value="ASDDSADSAD2222" />
      </Form>
    </div>
  );
}
