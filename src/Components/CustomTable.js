import { useTable, usePagination } from "react-table";
import { IoAddCircleOutline } from "react-icons/io5";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  IconButton,
  Text,
  Tooltip,
  Select,
  Box,
  Center,
  Button,
  TableContainer,
  Heading,
} from "@chakra-ui/react";
import Search from "./Search";

import "./Table.css";

import {
  ArrowRightIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@chakra-ui/icons";
import { BsFillCloudDownloadFill } from "react-icons/bs";

import { AiOutlineFolderView, AiFillEdit } from "react-icons/ai";
import { HiTrash } from "react-icons/hi";

import moment from "moment/moment";

const ActionsBtn = () => {
  return (
    <Flex columnGap={1}>
      <Button
        _hover={{
          bg: "#BEEFDA",
          boxShadow: "lg",
          transform: "scale(1.2,1.2)",
          transition: "0.3s",
        }}
      >
        <AiOutlineFolderView color="teal" />
      </Button>
      <Button
        _hover={{
          bg: "lightgray",
          boxShadow: "lg",
          transform: "scale(1.2,1.2)",
          transition: "0.3s",
        }}
      >
        <AiFillEdit color="grey" />
      </Button>
      <Button
        _hover={{
          bg: "#FCD299",
          boxShadow: "lg",
          transform: "scale(1.2,1.2)",
          transition: "0.3s",
        }}
      >
        <HiTrash color="darkorange" />
      </Button>
    </Flex>
  );
};

const CustomTable = ({
  title,
  columns,
  data,
  fetch,
  search,
  setSearch,
  handleClick,
  child,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );

  const CustomBtnTheme = {
    backgroundColor: "#9AE6B4",
    borderRadius: "52px",
    fontSize: "20px",
  };

  return (
    <Box h="91vh">
      <Box w={"100%"}>
        <Flex
          justifyContent={"space-between"}
          flexDirection={["column", "column", "row", "row"]}
        >
          <Flex alignItems={"center"} columnGap={5}>
            <Heading size="lg" color={"teal"}>
              {title}
            </Heading>
            <Search
              search={search}
              placeholder={`Search ${title}`}
              currsearch={setSearch}
            />
          </Flex>
          <Box>
            <Flex columnGap={3} justifyContent={"end"}>
              <Button
                size={"sm"}
                fontSize={14}
                bg={"teal"}
                colorScheme={"green"}
                color={"white"}
                variant={"solid"}
                fontWeight={"normal"}
                className={""}
                onClick={handleClick}
                columnGap={2}
                mt={5}
                _hover={{
                  bg: "teal",
                }}
              >
                {title === "Purchase Request" ? (
                  <BsFillCloudDownloadFill fontSize={20} marginRight="5px" />
                ) : (
                  <IoAddCircleOutline fontSize={20} marginRight="5px" />
                )}
                {title === "Purchase Request"
                  ? "Download PR From BizBox"
                  : title}
              </Button>
              {child !== null ? child : null}
              <Select
                w={32}
                mt={5}
                bg={"white"}
                size={"sm"}
                value={pageSize}
                focusBorderColor={"gray.400"}
                borderRadius={5}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                }}
              >
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <option fontSize={14} key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </Select>
            </Flex>
          </Box>
        </Flex>
      </Box>
      <TableContainer w={"100%"}>
        <Table
          mt={5}
          mb={5}
          bg={"white"}
          maxWidth={"100%"}
          className={"table"}
          variant="unstyled"
          boxShadow={"2xl"}
          overflow="hidden"
          {...getTableProps()}
        >
          <Thead>
            {headerGroups.map((headerGroup) => (
              <Tr
                h={"5rem"}
                fontSize={15}
                {...headerGroup.getHeaderGroupProps()}
              >
                {headerGroup.headers.map((column) => (
                  <Th
                    bg={"white"}
                    color={"gray.600"}
                    fontSize={15}
                    border={"white"}
                    {...column.getHeaderProps()}
                  >
                    {column.render("Header")}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.length >= 1 ? (
              page.map((row, i) => {
                prepareRow(row);
                return (
                  <Tr className="td" {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <Td {...cell.getCellProps()}>
                          {cell.column.id === "action" ? (
                            <ActionsBtn />
                          ) : cell.column.id === "created_at" ? (
                            moment(cell.row.values.created_at).format(
                              "hh:mm a MM-DD-YYYY"
                            )
                          ) : cell.column.id === "updated_at" ? (
                            moment(cell.row.values.updated_at).format(
                              "hh:mm a MM-DD-YYYY"
                            )
                          ) : cell.column.id === "dept" ? (
                            <Text
                              fontWeight={"bold"}
                              textTransform={"uppercase"}
                              color={"green.600"}
                            >
                              {cell.row.values.dept_Name}
                            </Text>
                          ) : cell.column.Header === "ID" ? (
                            <Text fontWeight={"bold"} color={"green.600"}>
                              {pageIndex * 10 + ++i}
                            </Text>
                          ) : cell.column.Header === "users" ? (
                            <>{cell.row.values.user}</>
                          ) : cell.column.id === "total" ? (
                            <Text fontWeight={"bold"}>
                              ₱ {cell.row.values.total}
                            </Text>
                          ) : (
                            cell.render("Cell")
                          )}
                        </Td>
                      );
                    })}
                  </Tr>
                );
              })
            ) : (
              <Text>NO RECORD</Text>
            )}
          </Tbody>
        </Table>
      </TableContainer>
      {page.length >= 1 ? (
        <Flex justifyContent={"end"} bg={"rgba(0,0,0,0.05)"} mt={5}>
          <div id="btnleft">
            <Tooltip label="First Page">
              <IconButton
                style={CustomBtnTheme}
                onClick={() => gotoPage(0)}
                isDisabled={!canPreviousPage}
                icon={<ArrowLeftIcon h={3} w={3} />}
                mr={4}
              />
            </Tooltip>
            <Tooltip label="Previous Page">
              <IconButton
                style={CustomBtnTheme}
                className="paginationbtn"
                onClick={previousPage}
                isDisabled={!canPreviousPage}
                icon={<ChevronLeftIcon h={6} w={6} />}
              />
            </Tooltip>
          </div>

          <Box bg={"white.200"} p={2} borderRadius={5}>
            <Flex>
              <Box fontSize={13}>Page</Box>
              <Text fontWeight="bold" fontSize={13} ml={2} as="span">
                {pageIndex + 1}
              </Text>
              <Box ml={2} fontSize={13} w={"2rem"}>
                of
              </Box>

              <Text fontSize={13} fontWeight="bold" as="span">
                {pageOptions.length}
              </Text>
            </Flex>
          </Box>

          <div id="btnright">
            <Tooltip label="Next Page">
              <IconButton
                style={CustomBtnTheme}
                className="paginationbtn"
                onClick={nextPage}
                isDisabled={!canNextPage}
                icon={<ChevronRightIcon h={6} w={6} />}
              />
            </Tooltip>
            <Tooltip label="Last Page">
              <IconButton
                style={CustomBtnTheme}
                className="paginationbtn"
                onClick={() => gotoPage(pageCount - 1)}
                isDisabled={!canNextPage}
                icon={<ArrowRightIcon h={3} w={3} />}
                ml={4}
              />
            </Tooltip>
          </div>
        </Flex>
      ) : (
        ""
      )}
    </Box>
  );
};

export default CustomTable;
