import React from "react";

// style
import styled from "styled-components";

// axios
import instance from "../shared/axios";

// icons
import { FiChevronDown } from "react-icons/fi";

const SetAddress = (props) => {
  const [cityList, setCityList] = React.useState([]);
  const [provinceList, setProvinceList] = React.useState([]);
  const setCity = props.setCity
  const setProvince = props.setProvince
  const setPage = props.setPage


  React.useEffect(() => {
    instance.get("/api/together/city").then((res) => setCityList(res.data));
  }, []);

  const changeCity = (e) => {
    setCity(() => e.target.value)
    setProvince(() => 'all')
    const cityId = e.target.value
    if (e.target.value !== 'all') {
      instance.get('/api/together/province/'+cityId).then((res) => setProvinceList(res.data))
    }
    setPage(()=>0)
  };

  const changeProv = (e) => {
    setProvince(() => e.target.value)
  }

  return (
      <SelectWrap>
        <select onChange={(e)=>changeCity(e)}>
          <option value="all">서울시 전체</option>
          {cityList?.map((city) => (
            <option key={city.cityId} value={city.cityId}>
              {city.cityName}
            </option>
          ))}
        </select>

        <SelectArrow>
          <FiChevronDown/>
        </SelectArrow>

        <select onChange={(e)=>changeProv(e)}>
          <option value="all">읍/면/동</option>
          {provinceList?.map((prov) => (
            <option key={prov.provinceId} value={prov.provinceId}>
            {prov.provinceName}
          </option>
          ))}
        </select>

        <SelectArrow>
          <FiChevronDown/>
        </SelectArrow>
        
      </SelectWrap>
  );
};

export default SetAddress;

const SelectWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-right: 3%;
  
  select {
    width: 48.7%;
    height: 4rem;
    border: 1px solid #bdbdbd;
    border-radius: 4rem;
    padding: 0 0 0 5.33%;
    font-size: 1.2rem;
    outline: none;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
  }
`;

const SelectArrow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 2rem;
  border: 1px solid #bdbdbd;

  margin-left: -18%;
  color: #bdbdbd;
  font-size: 1.6rem;
  padding-top: 2px;
`