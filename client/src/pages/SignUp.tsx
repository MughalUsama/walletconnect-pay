import * as React from "react";
import * as PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";
import PageWrapper from "../components/PageWrapper";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";
import UploadToIpfs from "../components/UploadToIpfs";
import {
  adminRequestAuthentication,
  adminUpdateBusinessProfile,
  adminSubmitSignUp
} from "../redux/_admin";
import BUSINESS_TYPES from "../constants/businessTypes";
import COUNTRIES from "../constants/countries";

const SSubmitWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  margin-top: 24px;
`;

interface ISignUpProps {
  adminUpdateBusinessProfile: (updatedBusinessProfile: any) => void;
  adminSubmitSignUp: () => void;
  name: string;
  type: string;
  country: string;
  email: string;
}

class SignUp extends React.Component<any, ISignUpProps> {
  public static propTypes = {
    adminUpdateBusinessProfile: PropTypes.func.isRequired,
    adminSubmitSignUp: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
  };

  public componentDidMount() {
    if (!this.props.address) {
      this.props.adminRequestAuthentication();
    }
  }

  public render() {
    console.log("[SignUp] this.props", this.props); // tslint:disable-line
    const { name, description, logo, type, country, email, phone } = this.props;
    return (
      <PageWrapper>
        <Card shadow margin={20}>
          {/* <h4>{`Sign Up`}</h4> */}

          <UploadToIpfs
            size={200}
            label={`Logo`}
            image={logo}
            onUpload={(logo: string) =>
              this.props.adminUpdateBusinessProfile({ logo })
            }
          />

          <Input
            type="text"
            label="Name"
            placeholder="Crypto Café"
            value={name}
            disabled={false}
            onChange={(e: any) =>
              this.props.adminUpdateBusinessProfile({ name: e.target.value })
            }
          />

          <Input
            type="text"
            label="Description"
            placeholder="Boutique Coffeeshop for Crypto Folks"
            value={description}
            disabled={false}
            onChange={(e: any) =>
              this.props.adminUpdateBusinessProfile({
                description: e.target.value
              })
            }
          />

          <Dropdown
            label="Type"
            selected={type}
            options={BUSINESS_TYPES}
            displayKey={"display_name"}
            targetKey={"type"}
            onChange={(type: string) =>
              this.props.adminUpdateBusinessProfile({ type })
            }
          />

          <Input
            type="email"
            label="Email"
            placeholder="contact@cryptocafe.com"
            value={email}
            disabled={false}
            onChange={(e: any) =>
              this.props.adminUpdateBusinessProfile({ email: e.target.value })
            }
          />

          <Dropdown
            label="Country"
            selected={country}
            options={COUNTRIES}
            displayKey={"name"}
            targetKey={"code"}
            onChange={(country: string) =>
              this.props.adminUpdateBusinessProfile({ country })
            }
          />

          <Input
            type="text"
            label="Phone"
            placeholder="+49 03054908166"
            value={phone}
            disabled={false}
            onChange={(e: any) =>
              this.props.adminUpdateBusinessProfile({ phone: e.target.value })
            }
          />

          <SSubmitWrapper>
            <Button onClick={this.props.adminSubmitSignUp}>{`Submit`}</Button>
          </SSubmitWrapper>
        </Card>
      </PageWrapper>
    );
  }
}

const reduxProps = (store: any) => ({
  address: store.admin.address,
  name: store.admin.businessProfile.name,
  description: store.admin.businessProfile.description,
  logo: store.admin.businessProfile.logo,
  type: store.admin.businessProfile.type,
  country: store.admin.businessProfile.country,
  email: store.admin.businessProfile.email,
  phone: store.admin.businessProfile.phone
});

export default connect(
  reduxProps,
  { adminRequestAuthentication, adminUpdateBusinessProfile, adminSubmitSignUp }
)(SignUp);
