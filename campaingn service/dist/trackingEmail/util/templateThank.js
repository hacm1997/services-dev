"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.template = void 0;
function template() {
    return `<html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">

    <head>
        <meta charset="UTF-8">
        <meta content="width=device-width, initial-scale=1" name="viewport">
        <meta name="x-apple-disable-message-reformatting">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta content="telephone=no" name="format-detection">
        <title></title>
        <!--[if (mso 16)]>
        <style type="text/css">
        a {text-decoration: none;}
        </style>
        <![endif]-->
        <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
        <!--[if gte mso 9]>
    <xml>
        <o:OfficeDocumentSettings>
        <o:AllowPNG></o:AllowPNG>
        <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
    <style>
    #outlook a {
      padding: 0;
  }
  
  .es-button {
      mso-style-priority: 100 !important;
      text-decoration: none !important;
  }
  
  a[x-apple-data-detectors] {
      color: inherit !important;
      text-decoration: none !important;
      font-size: inherit !important;
      font-family: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
  }
  
  .es-desk-hidden {
      display: none;
      float: left;
      overflow: hidden;
      width: 0;
      max-height: 0;
      line-height: 0;
      mso-hide: all;
  }
  
  /*
  END OF IMPORTANT
  */
  body {
      width: 100%;
      font-family: arial, 'helvetica neue', helvetica, sans-serif;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
  }
  
  table {
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
      border-collapse: collapse;
      border-spacing: 0px;
  }
  
  table td,
  body,
  .es-wrapper {
      padding: 0;
      Margin: 0;
  }
  
  .es-content,
  .es-header,
  .es-footer {
      table-layout: fixed !important;
      width: 100%;
  }
  
  img {
      display: block;
      border: 0;
      outline: none;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
  }
  
  p,
  hr {
      Margin: 0;
  }
  
  h1,
  h2,
  h3,
  h4,
  h5 {
      Margin: 0;
      line-height: 120%;
      mso-line-height-rule: exactly;
      font-family: arial, 'helvetica neue', helvetica, sans-serif;
  }
  
  p,
  ul li,
  ol li,
  a {
      -webkit-text-size-adjust: none;
      -ms-text-size-adjust: none;
      mso-line-height-rule: exactly;
  }
  
  .es-left {
      float: left;
  }
  
  .es-right {
      float: right;
  }
  
  .es-p5 {
      padding: 5px;
  }
  
  .es-p5t {
      padding-top: 5px;
  }
  
  .es-p5b {
      padding-bottom: 5px;
  }
  
  .es-p5l {
      padding-left: 5px;
  }
  
  .es-p5r {
      padding-right: 5px;
  }
  
  .es-p10 {
      padding: 10px;
  }
  
  .es-p10t {
      padding-top: 10px;
  }
  
  .es-p10b {
      padding-bottom: 10px;
  }
  
  .es-p10l {
      padding-left: 10px;
  }
  
  .es-p10r {
      padding-right: 10px;
  }
  
  .es-p15 {
      padding: 15px;
  }
  
  .es-p15t {
      padding-top: 15px;
  }
  
  .es-p15b {
      padding-bottom: 15px;
  }
  
  .es-p15l {
      padding-left: 15px;
  }
  
  .es-p15r {
      padding-right: 15px;
  }
  
  .es-p20 {
      padding: 20px;
  }
  
  .es-p20t {
      padding-top: 20px;
  }
  
  .es-p20b {
      padding-bottom: 20px;
  }
  
  .es-p20l {
      padding-left: 20px;
  }
  
  .es-p20r {
      padding-right: 20px;
  }
  
  .es-p25 {
      padding: 25px;
  }
  
  .es-p25t {
      padding-top: 25px;
  }
  
  .es-p25b {
      padding-bottom: 25px;
  }
  
  .es-p25l {
      padding-left: 25px;
  }
  
  .es-p25r {
      padding-right: 25px;
  }
  
  .es-p30 {
      padding: 30px;
  }
  
  .es-p30t {
      padding-top: 30px;
  }
  
  .es-p30b {
      padding-bottom: 30px;
  }
  
  .es-p30l {
      padding-left: 30px;
  }
  
  .es-p30r {
      padding-right: 30px;
  }
  
  .es-p35 {
      padding: 35px;
  }
  
  .es-p35t {
      padding-top: 35px;
  }
  
  .es-p35b {
      padding-bottom: 35px;
  }
  
  .es-p35l {
      padding-left: 35px;
  }
  
  .es-p35r {
      padding-right: 35px;
  }
  
  .es-p40 {
      padding: 40px;
  }
  
  .es-p40t {
      padding-top: 40px;
  }
  
  .es-p40b {
      padding-bottom: 40px;
  }
  
  .es-p40l {
      padding-left: 40px;
  }
  
  .es-p40r {
      padding-right: 40px;
  }
  
  .es-menu td {
      border: 0;
  }
  
  .es-menu td a img {
      display: inline-block !important;
      vertical-align: middle;
  }
  
  /*
  END CONFIG STYLES
  */
  s {
      text-decoration: line-through;
  }
  
  p,
  ul li,
  ol li {
      font-family: arial, 'helvetica neue', helvetica, sans-serif;
      line-height: 150%;
  }
  
  ul li,
  ol li {
      Margin-bottom: 15px;
      margin-left: 0;
  }
  
  a {
      text-decoration: underline;
  }
  
  .es-menu td a {
      text-decoration: none;
      display: block;
      font-family: arial, 'helvetica neue', helvetica, sans-serif;
  }
  
  .es-wrapper {
      width: 100%;
      height: 100%;
      background-repeat: repeat;
      background-position: center top;
  }
  
  .es-wrapper-color,
  .es-wrapper {
      background-color: #f6f6f6;
  }
  
  .es-header {
      background-color: transparent;
      background-repeat: repeat;
      background-position: center top;
  }
  
  .es-header-body {
      background-color: #ffffff;
  }
  
  .es-header-body p,
  .es-header-body ul li,
  .es-header-body ol li {
      color: #333333;
      font-size: 14px;
  }
  
  .es-header-body a {
      color: #2cb543;
      font-size: 14px;
  }
  
  .es-content-body {
      background-color: #ffffff;
  }
  
  .es-content-body p,
  .es-content-body ul li,
  .es-content-body ol li {
      color: #333333;
      font-size: 14px;
  }
  
  .es-content-body a {
      color: #2cb543;
      font-size: 14px;
  }
  
  .es-footer {
      background-color: transparent;
      background-repeat: repeat;
      background-position: center top;
  }
  
  .es-footer-body {
      background-color: #ffffff;
  }
  
  .es-footer-body p,
  .es-footer-body ul li,
  .es-footer-body ol li {
      color: #333333;
      font-size: 14px;
  }
  
  .es-footer-body a {
      color: #2cb543;
      font-size: 14px;
  }
  
  .es-infoblock,
  .es-infoblock p,
  .es-infoblock ul li,
  .es-infoblock ol li {
      line-height: 120%;
      font-size: 12px;
      color: #cccccc;
  }
  
  .es-infoblock a {
      font-size: 12px;
      color: #cccccc;
  }
  
  h1 {
      font-size: 30px;
      font-style: normal;
      font-weight: normal;
      color: #333333;
  }
  
  h2 {
      font-size: 24px;
      font-style: normal;
      font-weight: normal;
      color: #333333;
  }
  
  h3 {
      font-size: 20px;
      font-style: normal;
      font-weight: normal;
      color: #333333;
  }
  
  .es-header-body h1 a,
  .es-content-body h1 a,
  .es-footer-body h1 a {
      font-size: 30px;
  }
  
  .es-header-body h2 a,
  .es-content-body h2 a,
  .es-footer-body h2 a {
      font-size: 24px;
  }
  
  .es-header-body h3 a,
  .es-content-body h3 a,
  .es-footer-body h3 a {
      font-size: 20px;
  }
  
  a.es-button,
  button.es-button {
      display: inline-block;
      background: #31cb4b;
      border-radius: 30px;
      font-size: 18px;
      font-family: arial, 'helvetica neue', helvetica, sans-serif;
      font-weight: normal;
      font-style: normal;
      line-height: 120%;
      color: #ffffff;
      text-decoration: none;
      width: auto;
      text-align: center;
      padding: 10px 20px 10px 20px;
      mso-padding-alt: 0;
      mso-border-alt: 10px solid #31cb4b;
  }
  
  .es-button-border {
      border-style: solid solid solid solid;
      border-color: #2cb543 #2cb543 #2cb543 #2cb543;
      background: #31cb4b;
      border-width: 0px 0px 2px 0px;
      display: inline-block;
      border-radius: 30px;
      width: auto;
  }
  
  .msohide {
      mso-hide: all;
  }
  
  /* RESPONSIVE STYLES Please do not delete and edit CSS styles below. If you don't need responsive layout, please delete this section. */
  @media only screen and (max-width: 600px) {
  
      p,
      ul li,
      ol li,
      a {
          line-height: 150% !important;
      }
  
      h1,
      h2,
      h3,
      h1 a,
      h2 a,
      h3 a {
          line-height: 120% !important;
      }
  
      h1 {
          font-size: 30px !important;
          text-align: left;
      }
  
      h2 {
          font-size: 24px !important;
          text-align: left;
      }
  
      h3 {
          font-size: 20px !important;
          text-align: left;
      }
  
      .es-header-body h1 a,
      .es-content-body h1 a,
      .es-footer-body h1 a {
          font-size: 30px !important;
          text-align: left;
      }
  
      .es-header-body h2 a,
      .es-content-body h2 a,
      .es-footer-body h2 a {
          font-size: 24px !important;
          text-align: left;
      }
  
      .es-header-body h3 a,
      .es-content-body h3 a,
      .es-footer-body h3 a {
          font-size: 20px !important;
          text-align: left;
      }
  
      .es-menu td a {
          font-size: 14px !important;
      }
  
      .es-header-body p,
      .es-header-body ul li,
      .es-header-body ol li,
      .es-header-body a {
          font-size: 14px !important;
      }
  
      .es-content-body p,
      .es-content-body ul li,
      .es-content-body ol li,
      .es-content-body a {
          font-size: 14px !important;
      }
  
      .es-footer-body p,
      .es-footer-body ul li,
      .es-footer-body ol li,
      .es-footer-body a {
          font-size: 14px !important;
      }
  
      .es-infoblock p,
      .es-infoblock ul li,
      .es-infoblock ol li,
      .es-infoblock a {
          font-size: 12px !important;
      }
  
      *[class="gmail-fix"] {
          display: none !important;
      }
  
      .es-m-txt-c,
      .es-m-txt-c h1,
      .es-m-txt-c h2,
      .es-m-txt-c h3 {
          text-align: center !important;
      }
  
      .es-m-txt-r,
      .es-m-txt-r h1,
      .es-m-txt-r h2,
      .es-m-txt-r h3 {
          text-align: right !important;
      }
  
      .es-m-txt-l,
      .es-m-txt-l h1,
      .es-m-txt-l h2,
      .es-m-txt-l h3 {
          text-align: left !important;
      }
  
      .es-m-txt-r img,
      .es-m-txt-c img,
      .es-m-txt-l img {
          display: inline !important;
      }
  
      .es-button-border {
          display: inline-block !important;
      }
  
      a.es-button,
      button.es-button {
          font-size: 18px !important;
          display: inline-block !important;
      }
  
      .es-adaptive table,
      .es-left,
      .es-right {
          width: 100% !important;
      }
  
      .es-content table,
      .es-header table,
      .es-footer table,
      .es-content,
      .es-footer,
      .es-header {
          width: 100% !important;
          max-width: 600px !important;
      }
  
      .es-adapt-td {
          display: block !important;
          width: 100% !important;
      }
  
      .adapt-img {
          width: 100% !important;
          height: auto !important;
      }
  
      .es-m-p0 {
          padding: 0 !important;
      }
  
      .es-m-p0r {
          padding-right: 0 !important;
      }
  
      .es-m-p0l {
          padding-left: 0 !important;
      }
  
      .es-m-p0t {
          padding-top: 0 !important;
      }
  
      .es-m-p0b {
          padding-bottom: 0 !important;
      }
  
      .es-m-p20b {
          padding-bottom: 20px !important;
      }
  
      .es-mobile-hidden,
      .es-hidden {
          display: none !important;
      }
  
      tr.es-desk-hidden,
      td.es-desk-hidden,
      table.es-desk-hidden {
          width: auto !important;
          overflow: visible !important;
          float: none !important;
          max-height: inherit !important;
          line-height: inherit !important;
      }
  
      tr.es-desk-hidden {
          display: table-row !important;
      }
  
      table.es-desk-hidden {
          display: table !important;
      }
  
      td.es-desk-menu-hidden {
          display: table-cell !important;
      }
  
      .es-menu td {
          width: 1% !important;
      }
  
      table.es-table-not-adapt,
      .esd-block-html table {
          width: auto !important;
      }
  
      table.es-social {
          display: inline-block !important;
      }
  
      table.es-social td {
          display: inline-block !important;
      }
  
      .es-desk-hidden {
          display: table-row !important;
          width: auto !important;
          overflow: visible !important;
          max-height: inherit !important;
      }
  
      .es-m-p5 {
          padding: 5px !important;
      }
  
      .es-m-p5t {
          padding-top: 5px !important;
      }
  
      .es-m-p5b {
          padding-bottom: 5px !important;
      }
  
      .es-m-p5r {
          padding-right: 5px !important;
      }
  
      .es-m-p5l {
          padding-left: 5px !important;
      }
  
      .es-m-p10 {
          padding: 10px !important;
      }
  
      .es-m-p10t {
          padding-top: 10px !important;
      }
  
      .es-m-p10b {
          padding-bottom: 10px !important;
      }
  
      .es-m-p10r {
          padding-right: 10px !important;
      }
  
      .es-m-p10l {
          padding-left: 10px !important;
      }
  
      .es-m-p15 {
          padding: 15px !important;
      }
  
      .es-m-p15t {
          padding-top: 15px !important;
      }
  
      .es-m-p15b {
          padding-bottom: 15px !important;
      }
  
      .es-m-p15r {
          padding-right: 15px !important;
      }
  
      .es-m-p15l {
          padding-left: 15px !important;
      }
  
      .es-m-p20 {
          padding: 20px !important;
      }
  
      .es-m-p20t {
          padding-top: 20px !important;
      }
  
      .es-m-p20r {
          padding-right: 20px !important;
      }
  
      .es-m-p20l {
          padding-left: 20px !important;
      }
  
      .es-m-p25 {
          padding: 25px !important;
      }
  
      .es-m-p25t {
          padding-top: 25px !important;
      }
  
      .es-m-p25b {
          padding-bottom: 25px !important;
      }
  
      .es-m-p25r {
          padding-right: 25px !important;
      }
  
      .es-m-p25l {
          padding-left: 25px !important;
      }
  
      .es-m-p30 {
          padding: 30px !important;
      }
  
      .es-m-p30t {
          padding-top: 30px !important;
      }
  
      .es-m-p30b {
          padding-bottom: 30px !important;
      }
  
      .es-m-p30r {
          padding-right: 30px !important;
      }
  
      .es-m-p30l {
          padding-left: 30px !important;
      }
  
      .es-m-p35 {
          padding: 35px !important;
      }
  
      .es-m-p35t {
          padding-top: 35px !important;
      }
  
      .es-m-p35b {
          padding-bottom: 35px !important;
      }
  
      .es-m-p35r {
          padding-right: 35px !important;
      }
  
      .es-m-p35l {
          padding-left: 35px !important;
      }
  
      .es-m-p40 {
          padding: 40px !important;
      }
  
      .es-m-p40t {
          padding-top: 40px !important;
      }
  
      .es-m-p40b {
          padding-bottom: 40px !important;
      }
  
      .es-m-p40r {
          padding-right: 40px !important;
      }
  
      .es-m-p40l {
          padding-left: 40px !important;
      }
  }
    </style>
    </head>
    
    <body>
        <div dir="ltr" class="es-wrapper-color">
            <!--[if gte mso 9]>
          <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
            <v:fill type="tile" color="#f6f6f6"></v:fill>
          </v:background>
        <![endif]-->
            <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
                <tbody>
                    <tr>
                        <td class="esd-email-paddings" valign="top">
                            <table cellpadding="0" cellspacing="0" class="es-content esd-footer-popover" align="center">
                                <tbody>
                                    <tr>
                                        <td class="esd-stripe" align="center">
                                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600">
                                                <tbody>
                                                    <tr>
                                                        <td class="esd-structure" align="left">
                                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                                <tbody>
                                                                    <tr>
                                                                        <td width="600" class="esd-container-frame" align="center" valign="top">
                                                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td align="center" class="esd-block-spacer es-p20" style="font-size:0">
                                                                                            <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td style="border-bottom: 0px solid #cccccc; background: unset; height: 1px; width: 100%; margin: 0px;"></td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <tr class="es-visible-amp-html-only">
                                                        <td class="esd-structure es-struct-amp es-p40t es-p40b es-p20r es-p20l" align="left">
                                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                                <tbody>
                                                                    <tr>
                                                                        <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td class="esd-block-text es-p25b" align="center">
                                                                                            <h3>Deje comentarios sobre nuestra empresa y ayude a otros a tomar la decisión correcta.</h3>
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td class="esd-block-html" align="left">
                                                                                            <style>
                                                                                                .review-form4 *:focus {
                                                                                                    outline: none;
                                                                                                }
    
                                                                                                .review-form4 amp-selector {
                                                                                                    text-align: center;
                                                                                                    width: 100%;
                                                                                                    display: flex;
                                                                                                    justify-content: space-around;
                                                                                                    max-width: 400px;
                                                                                                    margin: 0 auto;
                                                                                                }
    
                                                                                                .review-form4 amp-selector>div {
                                                                                                    display: inline-block;
                                                                                                    color: #000000;
                                                                                                    text-align: center;
                                                                                                    line-height: 25px;
                                                                                                    font-size: 16px;
                                                                                                }
    
                                                                                                .review-form4 amp-selector [option][selected],
                                                                                                .review-form4 amp-selector [option]:hover {
                                                                                                    outline: none;
                                                                                                    border: 0;
                                                                                                }
    
                                                                                                .review-form4.amp-form-submit-success .hide {
                                                                                                    display: none;
                                                                                                }
    
                                                                                                .review-form4 div[submit-error],
                                                                                                .review-form4 div[submit-success] {
                                                                                                    padding: 20px 0;
                                                                                                }
    
                                                                                                @media only screen and (max-width: 600px) {
                                                                                                    .review-form4 amp-selector h5 {
                                                                                                        font-size: 11px;
                                                                                                        font-weight: normal;
                                                                                                    }
                                                                                                }
                                                                                            </style>
                                                                                            <form class="review-form4" id="review-form4" method="post" action-xhr="https://amp.stripo.email/v1/form/qvkc/test1"><input type="hidden" name="user_email" value="%EMAIL|%">
                                                                                                <div class="hide">
                                                                                                    <div class="review" style="position:relative;">
                                                                                                        <amp-selector name="review" layout="container">
                                                                                                            <div option="1" role="option" tabindex="1" on="tap:AMP.setState({review1: '1'}), review-form4.submit">
                                                                                                                <table>
                                                                                                                    <tbody>
                                                                                                                        <tr>
                                                                                                                            <td align="center" class="esd-block-image" style="font-size: 0px;"><a target="_blank"><img src="https://ffpyjcm.stripocdn.email/content/guids/CABINET_710452016c6c1f0ba1999fee6af99bb2/images/48151612360937430.png" alt style="display: block;" width="40"></a></td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td align="center" class="esd-block-text es-p10t">
                                                                                                                                <h5>Terrible</h5>
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                    </tbody>
                                                                                                                </table>
                                                                                                            </div>
                                                                                                            <div option="2" role="option" tabindex="1" on="tap:AMP.setState({review1: '2'}), review-form4.submit">
                                                                                                                <table>
                                                                                                                    <tbody>
                                                                                                                        <tr>
                                                                                                                            <td align="center" class="esd-block-image" style="font-size: 0px;"><a target="_blank"><img src="https://ffpyjcm.stripocdn.email/content/guids/CABINET_710452016c6c1f0ba1999fee6af99bb2/images/4531612360937638.png" alt style="display: block;" width="40"></a></td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td align="center" class="esd-block-text es-p10t">
                                                                                                                                <h5>Poor</h5>
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                    </tbody>
                                                                                                                </table>
                                                                                                            </div>
                                                                                                            <div option="3" role="option" tabindex="1" on="tap:AMP.setState({review1: '3'}), review-form4.submit">
                                                                                                                <table>
                                                                                                                    <tbody>
                                                                                                                        <tr>
                                                                                                                            <td align="center" class="esd-block-image" style="font-size: 0px;"><a target="_blank"><img src="https://ffpyjcm.stripocdn.email/content/guids/CABINET_710452016c6c1f0ba1999fee6af99bb2/images/69461612360936523.png" alt style="display: block;" width="40"></a></td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td align="center" class="esd-block-text es-p10t">
                                                                                                                                <h5>OK</h5>
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                    </tbody>
                                                                                                                </table>
                                                                                                            </div>
                                                                                                            <div option="4" role="option" tabindex="1" on="tap:AMP.setState({review1: '4'}), review-form4.submit">
                                                                                                                <table>
                                                                                                                    <tbody>
                                                                                                                        <tr>
                                                                                                                            <td align="center" class="esd-block-image" style="font-size: 0px;"><a target="_blank"><img src="https://ffpyjcm.stripocdn.email/content/guids/CABINET_710452016c6c1f0ba1999fee6af99bb2/images/85391612360936532.png" alt style="display: block;" width="40"></a></td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td align="center" class="esd-block-text es-p10t">
                                                                                                                                <h5>Good</h5>
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                    </tbody>
                                                                                                                </table>
                                                                                                            </div>
                                                                                                            <div option="5" role="option" tabindex="1" on="tap:AMP.setState({review1: '5'}), review-form4.submit">
                                                                                                                <table>
                                                                                                                    <tbody>
                                                                                                                        <tr>
                                                                                                                            <td align="center" class="esd-block-image" style="font-size: 0px;"><a target="_blank"><img src="https://ffpyjcm.stripocdn.email/content/guids/CABINET_710452016c6c1f0ba1999fee6af99bb2/images/46101612360936645.png" alt style="display: block;" width="40"></a></td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td align="center" class="esd-block-text es-p10t">
                                                                                                                                <h5>Excellent</h5>
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                    </tbody>
                                                                                                                </table>
                                                                                                            </div>
                                                                                                        </amp-selector>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div submit-success style="text-align: center;">
                                                                                                    <table width="100%" cellspacing="0" cellpadding="0">
                                                                                                        <tbody>
                                                                                                            <tr>
                                                                                                                <td align="center" class="esd-block-text">
                                                                                                                    <p style="color: #4dca31;">Muchas gracias por tu opinión.</p>
                                                                                                                </td>
                                                                                                            </tr>
                                                                                                        </tbody>
                                                                                                    </table>
                                                                                                </div>
                                                                                                <div submit-error style="text-align: center;">
                                                                                                    <table width="100%" cellspacing="0" cellpadding="0">
                                                                                                        <tbody>
                                                                                                            <tr>
                                                                                                                <td align="center" class="esd-block-text">
                                                                                                                    <p style="color: #ec382a;"><br></p>
                                                                                                                </td>
                                                                                                            </tr>
                                                                                                        </tbody>
                                                                                                    </table>
                                                                                                </div>
                                                                                            </form>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </body>
    </html>`;
}
exports.template = template;
//# sourceMappingURL=templateThank.js.map