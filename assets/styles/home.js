import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  container: {
    padding: 50,
    justifyContent: "center",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffdeb9",
  },
 
  categoryButton: {
    padding: 10,
    backgroundColor: "#9e693f",
    marginVertical: 5,
    borderRadius: 20,

  },
  
  selectedButton: {
    backgroundColor: "black",
  },
  categoryText: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  headerText: {
    fontSize: 18,
    marginBottom: 20,
    // center text
    textAlign: "center",
    // bold font
    fontWeight: "bold",
  },
  toggleButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 20,
    marginVertical: 10,
  },
  toggleButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  
});



export default style;
