import { Button, Table, Tbody, Td, Tr } from "@chakra-ui/react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function GeneratePDF(prop) {
  const realestate = prop.realestate
  const generate = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      html: "#realestate",
      styles:{borderCollapse:'collapse',marginButtom:'100px'}
    });

    autoTable(doc, {
      html: "#asset",
      styles:{borderCollapse:'collapse'}
    });
    doc.save("table.pdf");
  };
  return (
    <>
      <Table id="realestate" border={"2px"} color={'black'} style={{ display: "none",borderCollapse:'collapse' }}>
      <Tbody>
        <Tr>
          <Td>Report Date</Td>
          <Td>{new Date().toLocaleDateString()}</Td>
          <Td>Report Number</Td>
          <Td>1</Td>
        </Tr>

        <Tr>
          <Td colSpan="4">
            “Text area that describe the report purpose and disclaimer”
          </Td>
        </Tr>

        <Tr>
          <Td colSpan="4">Real Estate Information</Td>
        </Tr>

        <Tr>
          <Td>Real Estate ID</Td>
          <Td>{realestate.realestate_id}</Td>
          <Td>Real Estate Name</Td>
          <Td>{realestate.name}</Td>
        </Tr>

        <Tr>
          <Td>CounTry</Td>
          <Td>{realestate.country}</Td>
          <Td>City</Td>
          <Td>{realestate.city}</Td>
        </Tr>

        <Tr>
          <Td>Location</Td>
          <Td>{realestate.location}</Td>
          <Td>Real Estate Type</Td>
          <Td>{realestate.type.name}</Td>
        </Tr>

        <Tr>
          <Td>Age of the Property (Years)</Td>
          <Td>{realestate.property_age_years}</Td>
          <Td>Number of Floors</Td>
          <Td>{realestate.number_of_floors}</Td>
        </Tr>

        <Tr>
          <Td colSpan="4">Assets Summary Based on Maintenance</Td>
        </Tr>

        <Tr>
          <Td colSpan="2" rowSpan="6">
            Asset Type Name1 Based on Settings
          </Td>
        </Tr>

        <Tr>
          <Td>Total Number</Td>
          <Td>3</Td>
        </Tr>

        <Tr>
          <Td>On Track</Td>
          <Td>3</Td>
        </Tr>

        <Tr>
          <Td>Late in Maintenance</Td>
          <Td>5</Td>
        </Tr>

        <Tr>
          <Td>More Than One year with No Maintenance</Td>
          <Td>355</Td>
        </Tr>

        <Tr>
          <Td>Never Has Maintenance</Td>
          <Td>5</Td>
        </Tr>
        <Tr>
          <Td colSpan="2" rowSpan="6">
            Asset Type Name-n Based on Settings
          </Td>
        </Tr>

        <Tr>
          <Td>Total Number</Td>
          <Td>3</Td>
        </Tr>

        <Tr>
          <Td>On Track</Td>
          <Td>3</Td>
        </Tr>

        <Tr>
          <Td>Late in Maintenance</Td>
          <Td>5</Td>
        </Tr>

        <Tr>
          <Td>More Than One year with No Maintenance</Td>
          <Td>355</Td>
        </Tr>

        <Tr>
          <Td>Never Has Maintenance</Td>
          <Td>5</Td>
        </Tr>
      </Tbody>
      </Table>

      <Table id="asset" border={"2px"} color={'black'} style={{ display: "none",borderCollapse:'collapse' }}>
      <Tbody>

        <Tr>
          <Td colSpan="4">
            “Text area that describe the report purpose and disclaimer”
          </Td>
        </Tr>

        <Tr>
          <Td>Report Date</Td>
          <Td>{new Date().toLocaleDateString()}</Td>
          <Td>Report Number</Td>
          <Td>1</Td>
        </Tr>

        <Tr>
          <Td colSpan="4">Real Estate Information</Td>
        </Tr>

        <Tr>
          <Td colSpan="4">Asset Name 1</Td>
        </Tr>

        <Tr>
          <Td>Type (Main Category)</Td>
          <Td>{realestate.realestate_id}</Td>
          <Td>Make (Brand)</Td>
          <Td>{realestate.name}</Td>
        </Tr>

        <Tr>
          <Td>Model</Td>
          <Td>{realestate.country}</Td>
          <Td>Purchasing Price</Td>
          <Td>{realestate.city}</Td>
        </Tr>

        <Tr>
          <Td>Purchasing Currency</Td>
          <Td>{realestate.location}</Td>
          <Td>Purchasing Date</Td>
          <Td>{realestate.type.name}</Td>
        </Tr>

        <Tr>
          <Td>Floor Name or Number</Td>
          <Td>{realestate.property_age_years}</Td>
          <Td>Room Name or Number</Td>
          <Td>{realestate.number_of_floors}</Td>
        </Tr>

        <Tr>
          <Td colSpan="4">Assets Summary Based on Maintenance</Td>
        </Tr>


        <Tr>
          <Td colSpan="4">Assets Summary Based on Maintenance</Td>
        </Tr>

        <Tr>
          <Td colSpan="4">
            Asset Type Name1 Based on Settings
          </Td>
        </Tr>

        <Tr>
          <Td>Schedule Status</Td>
          <Td>{realestate.property_age_years}</Td>
          <Td>Date</Td>
          <Td>{realestate.number_of_floors}</Td>
        </Tr>

        <Tr>
        <Td>Schedule Status</Td>
          <Td>{realestate.property_age_years}</Td>
          <Td>Date</Td>
          <Td>{realestate.number_of_floors}</Td>
        </Tr>

        <Tr>
          <Td colSpan="4">
            Asset Type Name-n Based on Settings
          </Td>
        </Tr>

        <Tr>
          <Td colSpan="4">
            Asset Type Name-n Based on Settings
          </Td>
        </Tr>

        <Tr>
          <Td colSpan="4">
            Asset Type Name-n Based on Settings
          </Td>
        </Tr>

        
      </Tbody>
      </Table>
      
      <Button aria-label="editbtn" onClick={generate} colorScheme="primary">
        Download
      </Button>
    </>
  );
}


