// Based on a script by Kathie Decora : katydecorah.com/code/lunr-and-jekyll/

// Create the lunr index for the search
var index = elasticlunr(function () {
  this.addField('title')
  this.addField('author')
  this.addField('layout')
  this.addField('content')
  this.setRef('id')
});

// Add to this index the proper metadata from the Jekyll content

index.addDoc({
  title: "Using Piotroski F-Score to screen and trade stocks",
  author: "Martin Thodi",
  layout: "narrative",
  content: "\n\nIntroduction\nOne of the most important things an investor/trader has to do is to pick the stocks one wishes to invest in. There are many ways to analyze stocks, but they generally fall into two approaches : fundamental analysis and technical analysis. In technical analysis, the investor/trader looks at a stock’s historical prices as well as the trading volume (number of shares that were traded at a given price) with an attempt to predict the stock’s future price movements. The technical analyst believes that all the information one needs to know about a stock is reflected in the price of the stock.\n\nOn the other hand, fundamental analysis looks at company fundamental information such as company profits, amount of debt the company has, the rate at which the company’s profits are growing, the cost of operating the company, the competency of the management team and so on. As one can imagine, there is an ongoing debate as to which approach is superior. Whichever approach one uses, the ultimate aim is to decide whether to buy the stock, sell it, short it (sell it without buying it first) or hold on to it if one already bought it.\n\nIn this article, I will present the Piotroski F-score, a fundamentals based trading strategy that was published by Joseph Piotroski in 2002.\n\nBook Value &amp; Market Value\n\nBefore introducing the Piotroski score, it is best to first introduce the concept of a company’s book value and its  market value.  The book value of a company is the total value of the company’s assets that its shareholders would receive if the company was liquidated. Suppose some company XYZ has $300 dollars worth of office furniture, a small factory that is worth $1000 and a bank loan of $200. The book value of XYZ is then $1100 because if the company was to be liquidated and all assets sold; $200 would be paid to back to the bank and the owners would get $1100 ($1000 + $300 - $200) remaining to share amongst themselves.\n\nOn the other hand, market value is the total amount a company would fetch in the marketplace. If we assume that XYZ has 5 shares and that it is a public company trading on some stock exchange at a current price of $150 per share; then the market value of XYZ is $750 (5 shares x $150). This means that if the owners of the company decided to sell the whole company on the stock exchange to a new set of owners, they would receive $750 to divide amongst themselves. You must have noticed the difference here. If they liquidate the company they get $1100 but if they sell the company to the market they get $750, why the difference? It could be because other investors believe that if the company was liquidated, you would not get the $1100 but a much lower figure. Maybe the factory is too old or not useful anymore so it would not sell at $1000 but at $500. Maybe the office furniture is actually worthless. Or maybe the market is simply just underpricing the stock; and in time people would realize how much XYZ is really worth and its price would rise to reflect the true value of the company. A contrived example perhaps but the takeaway here is that markets sometimes underprice good companies.\n\nLooking for companies that are undervalued at the marketplace but might actually be worth more is the tenet of value investing.  How do you find an undervalued company? One common way is to pick companies that have a high book-to-market (BM) ratio. Not all companies with a high BM ratio are good for investment though, and indeed a lot of them might actually be in financial distress, that is why the market is asking for a low price for them in the first place! Piotroski in [1] presented a score that can be used to choose good companies from a set of high BM companies.\n\nIntroducing Piotroski F-Score\nThe Piotroski Score is a number between 0-9, with 9  symbolizing the best company, while 0 being the poorest performing company. The score is calculated as a composite score of 9 financial performance signals that show the company’s profitability, operational efficiency and capital structure.\n\nCalculation of score\nThe calculation of the score is as follows; we consider a given financial performance signal, if the signal is good a score of 1 is assigned to an indicator variable for the company, otherwise we assign a 0. In the end, the final score (termed F_SCORE by Piotroski) is a sum of all the indicator variables. Thus, if all the signals were good for the company, the F_SCORE will be 9. Similarly, an F_SCORE of 0 would mean all signals were bad. Signals used are presented subsequently.\n\nProfitability Signals\n1. ROA\n\n\n\n2. CFO\nThe secon signal is based on Cash Flow from operations. This is calculated as follows:\n\n\n\n3. \nThe third signal measures a change in ROA. The idea being that company with increasing ROA is better.\n\n\n\n4. ACCRUAL\nTo understand the rationale for using this signal, we have to remember that most companies make their financial reports using an accrual basis of accounting (transactions are recorded when goods and services are sold/bought and not necessarily when cash is received/paid). For example a company selling its goods on credit can report a profit of  $8000 when it has not received any of that in cash. Therefore, if most of the buyers later default on their payments, the company might have to write down their profits to a lower figure. Now accrual basis for accounting is not bad, but remember we are dealing with companies that might be in financial trouble, thus it would be prudent to know the quality of the company’s earnings. When they report profits of $8000, how much of it is really in the company’s bank account?\n\nACCRUAL is calculated as follows:\n\n\n\nCapital Structure Signals\nA company’s capital structure is how the company is using various sources of funds to finance its operations and/or growth. Sources\nof funds for a company include long-term loans and selling new shares on the market.\n\n5. \n\nThis signal measures the change in the company’s usage of long-term debt. Thus, in our universe of high BH firms, rising \nusage of debt is not good.\n\n\n\n6. \nMeasures the change in the firm’s usage of short-term debt. \nWe use  to measure the a firm’s usage of short-term debt.\n\n\n\n7. EQ_OFFER\nThis signal reflects if a company offered new equity in the current reporting period. Here is the rationale for this mesure. \nIn our universe of high BM firms, a business that requires repeated investments from owners is not a good business.\nTherefore, if a company offered new equity in the current period,  otherwise if no new equity was offered,\nthen .\n\nOperating Efficiency Signals\nThese signals measure how well a company is using its resources to generate revenue.\n\n8. \nMARGIN is defined as the firm’s current margin ratio (GM) ()\n\n\n\n9. \n\nTurnover ratio (total sales / total assets @ beginning of year) measures the productivity of a company’s asset base.\n\n\n\nAn increasing turnover ratio implies an increasing productivity of a company’s asset base.\n\nCalculating the total F_SCORE\nOnce all the indicator variables are calculated as above, the final F_SCORE is simply an addition of all the 9 indicator variables. A company that has an F_SCORE of 9 is considered to be in good condition while a company of an F_SCORE of 0 is poor.\n\nTrading Strategy\nOnce F_SCOREs of companies have been calculated one can use a long/short strategy. One can then buy (go long on) the companies with \na high F_SCORE (9, 8 or even 7). If short selling is allowed then one can short the companies with a\nlow F_SCORE (0,1 or even 2).  In an environment where short selling is not allowed, only going long on high F_SCORE firms will suffice.\n\nWhen would be the right time to trade?\nThe trading strategy only uses publicly avaiable information (financial reports). One can choose which reports to use, quarterly or final year results. The best time trade then would be soon after the reports are released.\n\nConclusion\nI have presented a trading strategy based on Piotroski F-Score. It is based in the paper published by Piotroski. A copy of the paper can be obtained here. In another post, I will show the strategy in action.\n\n",
  id: 0
});
console.log( jQuery.type(index) );

// Builds reference data (maybe not necessary for us, to check)
var store = [{
  "title": "Using Piotroski F-Score to screen and trade stocks",
  "author": "Martin Thodi",
  "layout": "narrative",
  "link": "/texts/piotroski-f-score/",
}
]

// Query
var qd = {}; // Gets values from the URL
location.search.substr(1).split("&").forEach(function(item) {
    var s = item.split("="),
        k = s[0],
        v = s[1] && decodeURIComponent(s[1]);
    (k in qd) ? qd[k].push(v) : qd[k] = [v]
});

function doSearch() {
  var resultdiv = $('#results');
  var query = $('input#search').val();

  // The search is then launched on the index built with Lunr
  var result = index.search(query);
  resultdiv.empty();
  if (result.length == 0) {
    resultdiv.append('<p class="">No results found.</p>');
  } else if (result.length == 1) {
    resultdiv.append('<p class="">Found '+result.length+' result</p>');
  } else {
    resultdiv.append('<p class="">Found '+result.length+' results</p>');
  }
  // Loop through, match, and add results
  for (var item in result) {
    var ref = result[item].ref;
    var searchitem = '<div class="result"><p><a href="'+store[ref].link+'?q='+query+'">'+store[ref].title+'</a></p></div>';
    resultdiv.append(searchitem);
  }
}

$(document).ready(function() {
  if (qd.q) {
    $('input#search').val(qd.q[0]);
    doSearch();
  }
  $('input#search').on('keyup', doSearch);
});
