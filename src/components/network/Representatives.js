import React, { Component, Fragment } from 'react';
import MediaQuery from "react-responsive";
import ExternalUrl from "../common/ExternalUrl";
import { connect } from "react-redux";
import { loadWitnesses } from "../../actions/network";
import { tu } from "../../utils/i18n";
import { BarLoader } from "../common/loaders";
import { FormattedNumber } from "react-intl";

class Representatives extends Component {

  componentDidMount() {
    this.props.loadWitnesses();
  }

  renderWitnesses() {

    let { witnesses } = this.props;

    if (witnesses.length === 0) {
      return (
        <div className="text-center d-flex justify-content-center p-4">
          <BarLoader />
        </div>
      );
    }

    return (
      <Fragment>
        <div class="container">
          <div class="table-responsive mt-3">
            <table class="table table-striped">
              <thead class="thead-dark">
                <tr className="text-nowrap">
                  <th>#</th>
                  <th>Website</th>
                  <th>Last block</th>
                  <th>Blocks produced</th>
                  <th>Blocks missed</th>
                  <th>Votes</th>
                </tr>
              </thead>
              <tbody>
                {
                  witnesses.map((account, index) => (
                    <tr>
                      <td><b>{index + 1}</b></td>
                      <td><ExternalUrl url={account.url} /></td>
                      <td>{account.latestBlockNumber}</td>
                      <td>{account.producedTotal}</td>
                      <td>{account.missedTotal}</td>
                      <td>{account.votes}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </Fragment>
    )
  }

  render() {

    let { witnesses } = this.props;

    return (
      <main role="main" className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="p-3 my-3 text-white-50 bg-dark rounded box-shadow row no-gutters">
              <div className="col-md-3 d-flex align-items-center mb-3 mb-md-0">
                <i className="fas fa-users fa-3x mr-3" style={{ width: 50 }} />
                <div className="lh-100">
                  <h6 className="mb-0 text-white lh-100">{tu("representatives")}</h6>
                  <small>{witnesses.length}</small>
                </div>
              </div>
              <div className="col-md-3 ml-md-auto d-flex align-items-center mb-3 mb-md-0">
                <i className="fas fa-trophy fa-3x mr-3" style={{ width: 50 }} />
                <div className="lh-100">
                  <h6 className="mb-0 text-white lh-100">{tu("most_votes")}</h6>
                  <small>{witnesses[0] && witnesses[0].votes} TRX</small>
                </div>
              </div>
              <div className="col-md-3 ml-md-auto d-flex align-items-center">
                <i className="fas fa-hashtag fa-3x mr-3" style={{ width: 50 }} />
                <div className="lh-100">
                  <h6 className="mb-0 text-white lh-100">{tu("newest_account")}</h6>
                  <small>4948C2E8A756D943703...</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="box-shadow">
              {this.renderWitnesses()}
            </div>
          </div>
        </div>
      </main>
    )
  }
}

function mapStateToProps(state) {
  return {
    witnesses: state.network.witnesses,
  };
}

const mapDispatchToProps = {
  loadWitnesses,
};

export default connect(mapStateToProps, mapDispatchToProps)(Representatives)
