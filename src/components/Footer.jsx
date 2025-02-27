function Footer() {
  return (
    <footer style={footerStyle}>
      <p>© 2025 HexaMart</p>
    </footer>
  );
}

const footerStyle = {
  position: "fixed",
  bottom: 0,
  width: "100%",
  textAlign: "center",
  backgroundColor: "#f1f1f1",
  borderTop: "1px solid #ccc",
  padding: "5px",
};

export default Footer;