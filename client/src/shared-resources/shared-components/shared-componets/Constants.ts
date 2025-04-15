import { environment } from "src/app/enviroments/enviroment";


export class Constants {

    static Only_pdf_or_zip_file_are_allowed_to_upload(Only_pdf_or_zip_file_are_allowed_to_upload: any, arg1: string) {
        throw new Error('Method not implemented.');
    }
    
    static messages = {
        emptyMessage: 'No data to display',
        selectedMessage: 'selected',
        totalMessage: 'total'
    };
    static goBack: string;
    static fromDate: string;
    static toDate: string;
    static getToghter: string;
    static expensesTxt: string;
    static issuanceReport: string;
    static accepted: string;
    static available: string;
    static assign: string;
    static accept: string;
    static applyText: string;
    static addNew: string;
    static previousText: string;
    static nextText: string;
    static selectText: string;
    static submit: string;
    static id: string;
    static bill: string;
    static current: string;
    static days: string;
    static min: string;
    static max: string;
    static view: string
    static english: string
    static arabic: string
    static toText: string
    static fromText: string
    static dateText: string
    static excel: string
    static pdf: string
    static email: string
    static ok: string
    static create: any;
    static clear: string;
    static delete: string;
    static update: string;
    static save: string;
    static distribution: string;
    static print: string;
    static commissions: string;
    static add: string;
    static post: string;
    static posted: string;
    static unposted: string;
    static ignore: string;
    static copy: string;
    static reverse: string;
    static recurring: string
    static atATimeText: string;
    static selectedText: string;
    static totalText: string;
    static deleteConfirmationText: string;
    static serverErrorText: string;
    static deleteCompanyAssociatedMessage: string;
    static deleteSuccessMessage: string;
    static butText: string;
    static ConfirmPasswordText: string;
    static alertmessage: string;
    static validationMessage: string;
    static selectAll: string;
    static unselectAll: string;
    static selectUser: string;
    static selectDays: string;
    static selectRoles: string;
    static selectCompany: string;
    static selectUserGroup: string;
    static select: string;
    static activeUsers: string;
    static inactiveUsers: string;
    static userGroups: string;
    static roleGroups: string;
    static roles: string;
    static passwordPolicy: string;
    static invalidPassword: string;
    static requiredValid: string;
    static tableViewtext: string;
    static msgText: string;
    static firstdateGreaterMsg: string;
    static lastdateGreaterMsg: string;
    static quarter: string;
    static firstQuarter: string;
    static secondQuarter: string;
    static thirdQuarter: string;
    static forthQuarter: string;
    static selectAccount: string;
    static accountNumberMissing: string;
    static confirmationModalTitle: string;
    static doYouWantToPostThisTransactionWithTransactionDateAs: string;
    static confirmationModalBody: string;
    static deleteConfirmationModalBody: string;
    static OkText: string;
    static CancelText: string;
    static btnCancelText: string;
    static accountDescription: string;
    static sameAccountNumberMsg: string;
    static accountNumberTitle: string;
    static createAccountNumber: string;
    static isDataFatch: boolean = false;
    static close: string;
    static ValidationToFromValue: string;
    static EmptyMessage: string;
    static fillAllFields: string;
    static minimumRange: string;
    static maximumRange: string;
    static fromPeriod: string;
    static toPeriod: string;
    static toValue: string;
    static toGreaterThan: string;
    static lessThan: string;
    static onePeriod: string;
    static twoPeriod: string;
    static greaterThan: string;
    static toLessThan: string;
    static maxrangeGreater: string;
    static minrange: string;
    static agingPeriod: string;
    static sevenAgingPeriod: string;
    static missingAccount: string;
    static greaterorEqualValue: string;
    static yearAndSeries: string;
    static oneRadio: string;
    static InvalidDate: string;
    static InvalidMonth: string;
    static InvalidYear: string;
    static InvalidDay: string;
    static mustBe: string;
    static footer: string;
    static footervalue: string;
    static ForbiddenMsg: string;
    static search: string;
    static currentPeriodLessthanPrv: string;
    static currentPeriodgreaterthanPrv: string;
    static invalidPeriodDate: string;
    static fillDate: string;
    static AmountText: string;
    static PercentageText: string;
    static YesText: string;
    static NoText: string;
    static MaximumAllowedSize: string;
    static allowedFileType: string;
    static Options: string;
    static Landscape: string;
    static Portrait: string;
    static showData: string;
    static action: string;
    static doYouWantToPostThisTransaction: string;
    static transactionsPostedSuccessfully: string;
    static JASPER_SERVER: string = 'http://localhost:8080/';
    static JASPER_REPORT_URL: string = 'jasperserver/flow.html?';
    static JASPER_REPORT_STATIC_PARAMS: string = '_flowId=viewReportFlow&_flowId=viewReportFlow&standAlone=true&decorate=no';
    static deleteRecord: string;
    static selectOneToDelete: string;
    static fillCompleteForm: string;
    static InvalidData: string;
    static addOneAtleast: string;
    static sureToContinue: string;
    static alreadyInUse: string;
    static recordCreatedMsg: string;
    static recordUpdatedMsg: string;
    static invalidForm: string;
    static recordAlreadyExist: string
    static PrintType: string;
    static SelectType: string;
    static notification: string;
    static paymentZeroWantToContinue: string;
    static quantityAvailableItemMsg: string;
    static wantHeaderFooterDetail: string;
    static invalidInput: string;
    static receivedAmountlessThanTotal: string;
    static itemsLessThenCostPrice: string;
    static pleaseSelecttem: string;
    static PleaseSelectCustomerFirst: string;
    static QuantityShouldBelessthanOrequalTo: string;
    static resetText: string
    static removeBatchId: string
    static defaultAlreadySelected: string;
    static oneMustBeDefault: string;
    static noSiteAssignToItem: string;
    static description: string;
    static shortDescription: string;
    static genericDescription: string;
    static back: string;
    static next: string;
    static summary: string;
    static detail: string;
    static SN: string;
    static reqItemQtyNA: string;
    static StartingLessThanEnding: string;
    static STARTING_DATE_SHOULD_BE_LESS_THAN_ENDING_DATE: string;
    static qtyMustBeGTZero: string;
    static showUOMAndOrderQty: string;
    static QtyGreaterThanAvailableQty: string;
    static fillAllDetailForSite: string;
    static DistributionandInvoiceAmountnotMatching: string;
    static totalDebitCreditAmountShouldequal: string;
    static deleteAll: string;
    static newTxt: string;
    static importText: string;
    static downloadTemplateText: string;
    static unitPriceIsLessThanCostPrice: string;
    static itemsUnitPriceIsLessThenCostPrice: string;
    static enterPasswordToProceed: string;
    static confirmPassword: string;
    static passwordConfirmed: string;
    static validPassword: string;
    static pleasefillthecompletedata: string;
    static thisTransactionIsAlreadyinUse: string;
    static postPreviousQuantitiesofTransaction: string;
    static noLocationIsSelectedForThisSite: string;
    static noSiteAssignForThisUser: string;
    static amountReceivedIsGreaterThenTotalAmount: string;
    static returnQuantityLessThanTotalQuantity: string;
    static lastSalesTransactionNotFound: string;
    static invlidTradeDiscount: string;
    static invlidItemTradeDiscount: string;
    static enterReturningQuantity: string;
    static thisItemIsAlreadySelected: string;
    static pleaseAddOneItem: string;
    static noCustomerAvailableForThisSite: string;
    static recordAlreadyAdded: string;
    static cannotConvertToOrderBecauseQuotationIsExpired: string;
    static pleaseSelectASite: string;
    static pleaseAddInformationForThisSite: string;
    static shipmentDateIsRequired: string;
    static cannotConvertToInvoiceBecauseOrderIsExpired: string;
    static itemsQuantityNotAvailable: string;
    static pleaseEnterCorrectPassword: string;
    static selectPaymentTermsFirst: string;
    static salesTransactionEntryPostedSuccessfully: string;
    static proceedWithPassword: string;
    static pleaseSelectFilter: string;
    static invalidPasswordTxt: string;
    static doYouWantToProceedWithPost: String;
    static confirmationText: String;
    static returnQuantityIsGreaterThanAvailableQuantity: string;
    static NO_DATA_TO_DISPLAY: string;
    static OK: string;
    static errorMessages: string;
    static proceedText: string;
    static siteAlreadyExist: string;
    static TRANSACTION_REVERSED_SUCCESSFULLY: string;
    static PLEASE_SELECT_TRANSACTION: string;
    static NO_EXPIRED_TRANSACTION_FOUND: string;
    static PLEASE_FILL_COMPLETE_DATA: string;
    static PLEASE_CHOOSE_FROM_EXISTING_STEP_SEQUENCE: string;
    static delegateText: string;
    static TRANSACTION_IN_PROCESS: string;
    static ALLOWED_DISCOUNT_PERCENTAGE_IS: string;
    static bughshanTenant: string = 'erp_bugshan_algoras';
    static tadawolTenant: string = 'erp_tadawol_algoras';
    static PLEASE_SELECT_USER: string = 'erp_bugshan_algoras';
    static rejectTxt: string;
    static are_You_Sure_You_Want_To: string;

    static ITEM_QUANTITY_MUST_BE_LESS_THAN_RECEIVING_QUANTITY: string;
    static ITEM_QUANTITY_MUST_BE_LESS_THAN_TRANSACTION_QUANTITY: string;
    static RECEIVING_DAMAGED_QUANTITY_SHOULD_NOT_BE_ZERO: string;
    static PLEASE_POST_PREVIOUS_QUANTITIES: string;

    static PLEASE_SELECT_UOM: string;
    static ADD_ANY_RECORD: string;
    static ITEM_QUANTITY_SHOULD_NOT_BE_ZERO_IF_NOT_AVAILABLE_THEN_REMOVE: string;
    static ENTER_MARKET_PRICE_FIRST: string;
    static AMOUNT_MUST_BE_EQUAL_TO_TOTAL_AMOUNT: string;
    static FIRST_SELECT_PURCHASE_ORDER: string;
    static THIS_ITEM_IS_ALREADY_SELECTED_WITH_SAME_UNIT_PRICE: string;
    static ITEM_PRICE_SHOULD_BE_GREATER_THAN_ZERO: string;
    static ITEM_COST_PRICE_SHOULD_NOT_BE_ZERO_AT_ROW: string;
    static NO_ITEM_FOUND: string;
    static INVALID_DATA_AT_ROW: string;
    static DUPLICATE_ITEM_AT_ROW: string;
    static EMAIL_SENT_SUCCESSFULLY: string;
    static EMAIL_NOT_SENT: string;
    static WORKFLOW_ACTIVE_QUOTATION_ALREADY_CREATED: string;
    static SUGGESTED_QUANTITY_SHOULD_BE_GREATER_THAN_ZERO: string;
    static TRANSFERRING_QUANTITY_MUST_BE_GREATER_THAN_ZERO: string;
    static SELECT_DIFFERENT_SITE: string;
    static NO_DEPARTMENT_DIVISION_PROJECT_OR_DOCTOR_HAS_BEEN_FOUND_AGAINST_THIS_SITE: string;
    static RETURNING_QUANTITY_SHOULD_NOT_BE_ZERO: string;
    static CHANGE_PRICE_OR_REMOVE: string;
    static PRICE_SHOULD_BE_GREATER_THAN_ZERO: string;
    static ARE_YOU_SURE_WANT_TO_REMOVE_SESSION: string;
    static WAITING_FOR_CONFIRMATION: string;
    static SOMEONE_TRYING_TO_USE_YOUR_CREDENTIALS: string;
    static TIME_REMAINING: string;
    static SECONDS: string;
    static PERMISSION_GRANTED: string;
    static PERMISSION_DENIED: string;
    static PLEASE_SELECT_AT_LEAST_1_RECORD: string;
    static MESSAGES: String;
    static OPEN: string;
    static selectSimple: string;
    static End_Time_Should_Be_Greater_Then_Start_Time: string;
    static SELECT_ID: string;
    static UPDATED_BY: string;
    static UPDATED_DATE: string;
    static HISTORY_VIEW: string;
    static longitude: string;
    static latitude: string;
    static select_location: string;
    static SHOW_BTN: string;
    static EXPORT_TXT: string;
    static REVERSE_TXT: string;
    static PERCENTAGE_VALUE_SHOULD_BE_LESS_THAN: string;
    static FILTERS_TXT: string;
    static THIS_DATE_CANNOT_BE_SELECTED_PLEASE_SELECT_ACCORDING_TO_THE_PERIOD: string;
    static MONTH: string;
    static WEEK: string;
    static DAY: string;
    static HISTORY_TXT: string;

    static QUOTATION_TXT: string;
    static ORDER_TXT: string;
    static INVOICE_TXT: string;
    static RETURN_TXT: string;

    static RECEIVED_TXT: string;
    static IN_TRANSIT_TXT: string;
    static PARTIAL_RECEIVED_TXT: string;

    static SHOP_TXT: string;
    static RESTAURANT_TXT: string;
    static PLEASE_SELECT_CUSTOMER_AND_WARRANTY_TYPE: string;
    static WARRANTY_AVAILABLE_FOR_ITEM: string;
    static WARRANTY_NOT_FOUND: string;
    static WARRANTY_EXPIRED: string;
    static INVALID_WARRANTY_DATES_PLEASE_EXTEND_WARRANTY: string;
    static NO_DEFINED_PAYMENT_METHODS: string;
    static ITEM_IS_CONSUMED: string;
    static ITEM_ALREADY_ASSIGNED_TO_CATEGORY: string;
    static ITEM_ALREADY_ADDED: string;
    static SELECTED_EMPLOYEE_ALREADY_ADDED: string;
    static INVALID_TECHNICIAN_NUMBER: string;
    static FILE_TYPE_NOT_SUPPORTED: string;
    static PLEASE_SELECT_AT_LEAST_1_FILTER: string;
    static SHOW_INACTIVE_EMPLOYEES : string;
    static DIRECT_PRINT: string;
    static ALLOW_MAX_PERCENTAGE_IS_100 : string;

    static PLEASE_SELECT_CUSTOMER_AND_ITEM : string;
    static ITEM_ORDERING_HAS_BEEN_STOPPED_BY_ADMIN : string;
    
    static IS_LESS_THEN: string;
    static ORDER_QUANTITY_IS_GREATER_THEN_AVAILABLE_QUANTITY: string;
    static QUANTITY_CHANGED_TO_AVAILABLE_QUANTITY: string;

    
    static APPROVE: string;
    static CREATE_USER_ACCOUNTS: string;
    
    static batchTransacitonType: any = {
        'JOURNAL_ENTRY': 1, 'CLEARING_ENTRY': 2, 'QUICK_JOURNAL_ENTRY': 3,
        'BUDGET_ENTRY': 4, 'CASH_RECEIPT_ENTRY': 5, 'BANK_TRANSFER': 6, 'BANK_TRANSACTION': 7,
        'AR_TransferEntry': 8, 'AR_Cash_Receipt_Entry': 9, 'AP_ENTER_VOID_TRANSACTION': 10, 'AP_ENTER_VOID_RECEIPT': 11, 'PAYMENT_VOUCHER': 12
    };

    static massCloseOriginType: any = {
        'GL_JOURNAL_ENTRY': 1, 'GL_Cash_Receipt_Entry': 2, 'GL_Bank_Transfer_Entry': 3,
        'AR_Transaction_Entry': 8, 'AR_Cash_Receipt_Entry': 9, 'AP_Transaction_Entry': 11, 'AP_Manual_Payment_Entry': 12
    };
}