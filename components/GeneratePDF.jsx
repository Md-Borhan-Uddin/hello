import { Button, Table, Tbody, Td, Tr } from "@chakra-ui/react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
/*
.tg  {border-collapse:collapse;border-spacing:0;}
.tg Td{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  overflow:hidden;padding:10px 5px;word-break:normal;}
.tg th{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
.tg .text-left{border-color:inherit;text-align:left;vertical-align:top}


*/

export default function GeneratePDF({ realestate }) {
  {
    console.log(realestate);
  }
  const generate = () => {
    const doc = new jsPDF();
    autoTable(doc, { 
      html: "#realestate", 
      styles: { fillColor: [255, 0, 0] },
      didDrawCell:(data)=>{
        console.log('data',data)
        if(data.table.body[8].index===8){
          console.log('data-inside',data.table.body[8].index)
          // autoTable(doc, { 
          //   html: "#inside_table",
          // })
        }

      }
      },
    
    );
    doc.save("Table.pdf");
  };
  return (
    <>
      <Table id="realestate" border={'2px'} style={{display:'none'}} >
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
            <Td>{realestate.counTry}</Td>
            <Td>City</Td>
            <Td>{realestate.city}</Td>
          </Tr>
          <Tr>
            <Td>Location</Td>
            <Td>{realestate.location}</Td>
            <Td>Real Estate Type</Td>
            <Td>{realestate.type}</Td>
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
            <Td colSpan="2">Asset Type Name1 Based on Settings</Td>
            <Td colSpan="2" rowSpan="2">
              
            </Td>
          </Tr>
          <Tr>
            <Td colSpan="2">Asset Type Name-n Based on Settings</Td>
          </Tr>
        </Tbody>
      </Table>
      <Table id="inside_table" border={'2px'} style={{display:'none'}} >
              <Tbody>
                <Tr>
                  <Td>Total Number:</Td>
                  <Td>23</Td>
                </Tr>
                <Tr>
                  <Td>On Track:</Td>
                  <Td>23</Td>
                </Tr>
                <Tr>
                  <Td>Late in Maintenance:</Td>
                  <Td>2233</Td>
                </Tr>
                <Tr>
                  <Td>More Than One year with No Maintenance:</Td>
                  <Td>22323</Td>
                </Tr>
                <Tr>
                  <Td>Never Has Maintenance:</Td>
                  <Td>322</Td>
                </Tr>
                <Tr>
                  <Td>Total Number:</Td>
                  <Td>2233</Td>
                </Tr>
                <Tr>
                  <Td>On Track:</Td>
                  <Td>22332</Td>
                </Tr>
                <Tr>
                  <Td>Late in Maintenance:</Td>
                  <Td>232323</Td>
                </Tr>
                <Tr>
                  <Td>More Than One year with No Maintenance:</Td>
                  <Td>32223</Td>
                </Tr>
                <Tr>
                  <Td>Never Has Maintenance:</Td>
                  <Td>232323</Td>
                </Tr>
              </Tbody>
              </Table>
      <Button aria-label="editbtn" onClick={generate} colorScheme="primary">
        Download
      </Button>
    </>
  );
}
