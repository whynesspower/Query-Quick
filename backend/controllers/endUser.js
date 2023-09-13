const User = require("../models/endUser");
const { sendMessage } = require("./message");
const Chat = require("../models/chat");
const Message = require("../models/message");

exports.registerCustomer = async (req, res, next) => {
  try {
    const { userId, isAgent } = req.body;
    const newUser = new User({
      userId: userId,
      isAgent: isAgent,
      email: userId,
    });
    await newUser.save();
    return res.status(200).json({
      message: "user created successfully",
      success: true,
      newUser,
    });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern.userId === 1) {
      return res.status(400).json({
        message: "user with that userId already exists",
      });
    } else {
      console.error(
        "An error occurred while creating the user:",
        error.message
      );
    }
  }
};

exports.loginCustomer = async (req, res, next) => {
  try {
    const userId = req.body.customerId;
    const user = await User.findOne({ email: userId, isAgent: false });
    if (user) {
      return res.status(200).json({
        success: true,
        user: user,
      });
    }
    return res.status(401).json({
      success: true,
      message: "Please enter the correct userId",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err,
    });
  }
};

exports.loginAgent = async (req, res, next) => {
  try {
    const userId = req.body.agentId;
    const user = await User.findOne({ email: userId, isAgent: true });
    if (user) {
      return res.status(200).json({
        success: true,
        user: user,
      });
    }
    return res.status(401).json({
      success: true,
      message: "Please enter the correct userId",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err,
    });
  }
};

exports.searchCustomers = async (req, res, next) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { userId: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};

    const users = await User.find(keyword).find({ isAgent: false });

    return res.status(200).json({
      success: true,
      users,
    });
  } catch (err) {}
};

const users = [
  {
    userId: "208",
    timestamp: "01-02-2017 19:29",
    content:
      "So it means if u pay ua loan before the due date is a disadvantage the last time I paid earlier it was still a problem",
  },
  {
    userId: "208",
    timestamp: "01-02-2017 19:21",
    content: "The dates of payment are still indicated n no money sent",
  },
  {
    userId: "208",
    timestamp: "01-02-2017 19:21",
    content: "Why was my application rejected",
  },
  {
    userId: "208",
    timestamp: "01-02-2017 19:05",
    content:
      "Hi branch I requested my number to remain the one I was using there before 0720225243  I don't understand how it changed",
  },
  {
    userId: "218",
    timestamp: "01-02-2017 16:08",
    content:
      "I said ill pay 5th esther camoon.. Infact you guys took a week to give me a loan and just cant wait 4days for me to pay back??",
  },
  {
    userId: "218",
    timestamp: "01-02-2017 14:07",
    content:
      "I  will pay on sunday of 5th and i will pay all the amount.. If that is allowed??",
  },
  {
    userId: "218",
    timestamp: "01-02-2017 12:07",
    content: "I have a late source of salary i expected but i will pay nexr",
  },
  {
    userId: "444",
    timestamp: "02-02-2017 15:57",
    content:
      "I will clear my loan before 15nth,kindly bear with me.January was tough.",
  },
  {
    userId: "676",
    timestamp: "03-02-2017 14:23",
    content: "Hi can i get the batch number",
  },
  {
    userId: "676",
    timestamp: "03-02-2017 14:23",
    content: "Hi can i get the batch number pl",
  },
  {
    userId: "779",
    timestamp: "03-02-2017 18:59",
    content:
      "I Still not satisfied. I am still asking for a review.  My number is 0723506931 or at least give me a clear reason.  Thanks",
  },
  {
    userId: "779",
    timestamp: "02-02-2017 17:33",
    content:
      "My number is 0723506931. please have a review of my loan. I haven't defaulted and I have cleared my outstanding loan on the due date.",
  },
  {
    userId: "779",
    timestamp: "02-02-2017 17:29",
    content:
      "Hi branch I have just cleared my  loan which was due today but unfortunately you have denied me. I haven't applied for a loan since December but your system says that I have applied for a loan last week. Please review my loan",
  },
  {
    userId: "1092",
    timestamp: "03-02-2017 18:53",
    content: "I got only this number please help me",
  },
  {
    userId: "1092",
    timestamp: "01-02-2017 19:02",
    content:
      "My number is 0790898526 help me to validate it please so i can be able to access the loan",
  },
  {
    userId: "1155",
    timestamp: "03-02-2017 07:01",
    content:
      "Hello,our salaries have been delayed but hopefully will be paid today or tomorrow.",
  },
  {
    userId: "1241",
    timestamp: "01-02-2017 12:43",
    content:
      "Thanks Branch for being understanding ..have cleared my loan....God bless you",
  },
  {
    userId: "1245",
    timestamp: "03-02-2017 16:28",
    content: "Hi, kindly can i have the batch number",
  },
  {
    userId: "1245",
    timestamp: "02-02-2017 16:47",
    content: "I have to clear by tomorrow please send me the batch number",
  },
  {
    userId: "1245",
    timestamp: "02-02-2017 16:19",
    content:
      "I was at CRB offices and they haven't received your clearance batch number. Please send it to me so I can clear with them.",
  },
  {
    userId: "1354",
    timestamp: "03-02-2017 05:17",
    content: "No need just expunge my details from the system",
  },
  {
    userId: "1354",
    timestamp: "02-02-2017 21:33",
    content:
      'Thank you for the loans i have benefitted from "the branch". Kindly expunge my details from your system. Its frustrating to be told to re apply in 7 days week in week out....it makes me look like a criminal. I will not be applying again.',
  },
  {
    userId: "1354",
    timestamp: "02-02-2017 12:02",
    content:
      "My loan has been rejected because it was rejected recently, after 14days suspension am being suspended again for a further 7days",
  },
  {
    userId: "1481",
    timestamp: "03-02-2017 01:52",
    content:
      "Hello. Why can't you make the loan payment options more... like say a choice between weekly and monthly.. someone to choose when applying for the loans..  regards",
  },
  {
    userId: "2035",
    timestamp: "03-02-2017 09:06",
    content: "Ok",
  },
  {
    userId: "2035",
    timestamp: "02-02-2017 18:25",
    content:
      "Hi,sorry for the short text however Someone used my I.D and did register a line and took mshwari loan but venye nili realize nilipigia safaricom customer care and i did the payment  and cleared a bill of 299now i dont have  any what is the way forward.",
  },
  {
    userId: "2035",
    timestamp: "02-02-2017 17:55",
    content: "Someone used",
  },
  {
    userId: "2035",
    timestamp: "02-02-2017 05:59",
    content: "What am i supposed to do after paying in order to re",
  },
  {
    userId: "2126",
    timestamp: "01-02-2017 16:06",
    content: "Any response to my above queries please???",
  },
  {
    userId: "2126",
    timestamp: "01-02-2017 15:58",
    content: "Kindly advise what sms are not in my phone....",
  },
  {
    userId: "2126",
    timestamp: "01-02-2017 15:52",
    content: "And have no current loan... Im upto date ...",
  },
  {
    userId: "2126",
    timestamp: "01-02-2017 15:51",
    content:
      "If there is a way u can check the mpesa sms in my phone.. Check and see all transactions sms are available ....and mpesa account is very active",
  },
  {
    userId: "2126",
    timestamp: "01-02-2017 15:50",
    content:
      "All my Mpesa sms are stored in sim card for long period ...and none has been deleted...",
  },
  {
    userId: "2126",
    timestamp: "01-02-2017 15:47",
    content: "What SMSs should i accumulate on my phone?",
  },
  {
    userId: "2126",
    timestamp: "01-02-2017 15:37",
    content:
      "Why has my loan application been rejected and i have never defaulted on any repayments and l always pay on time?",
  },
  {
    userId: "2126",
    timestamp: "01-02-2017 15:33",
    content: "Why has loan been rejected?",
  },
  {
    userId: "2517",
    timestamp: "02-02-2017 03:20",
    content: "Ok thanks",
  },
  {
    userId: "2517",
    timestamp: "01-02-2017 18:06",
    content:
      "I forwarded my certificate of clearance from trans union and even you replied that my account was cleared and you gave me a loan  of kshs 250 which I cleared. What is happening to my account?",
  },
  {
    userId: "2780",
    timestamp: "01-02-2017 00:05",
    content: "I cant access your services",
  },
  {
    userId: "2788",
    timestamp: "02-02-2017 13:20",
    content: "ok",
  },
  {
    userId: "2788",
    timestamp: "02-02-2017 12:54",
    content: "I promise to finish my loan by this month",
  },
  {
    userId: "2884",
    timestamp: "01-02-2017 07:57",
    content: "The messages are on my line...",
  },
  {
    userId: "2884",
    timestamp: "01-02-2017 07:56",
    content:
      "I hv my transaction messages with me y am i not approved to this time? I urgently need the cash",
  },
  {
    userId: "2926",
    timestamp: "03-02-2017 22:42",
    content: "Hi! I hope this will take you well, I cleared my loan",
  },
  {
    userId: "2983",
    timestamp: "01-02-2017 10:49",
    content: "Another 7 days what! For the third time now.",
  },
  {
    userId: "3056",
    timestamp: "01-02-2017 13:57",
    content:
      "Hey Branch i am sorry for being late in payment bt i will pay on Monday 6/2/2017 bt the reason of late repayment is due to maturing of cheque because it was signed late bt i apologize n opz it will never happen again.",
  },
  {
    userId: "3091",
    timestamp: "03-02-2017 08:11",
    content: "I'll pay the 32/= together with Monday's 566/=",
  },
  {
    userId: "3112",
    timestamp: "03-02-2017 15:22",
    content: "I appreciate for da follow-up u made tanx alot",
  },
  {
    userId: "3112",
    timestamp: "03-02-2017 13:28",
    content:
      "How long does it for me to get da batch number cz hve cleared ma loan on 31st",
  },
  {
    userId: "3112",
    timestamp: "03-02-2017 08:58",
    content: "Within aweek,specifically when plz",
  },
  {
    userId: "3112",
    timestamp: "03-02-2017 08:57",
    content: "72hrs",
  },
  {
    userId: "3112",
    timestamp: "03-02-2017 08:56",
    content: "Hope da clearance last for 72grs",
  },
  {
    userId: "3112",
    timestamp: "03-02-2017 07:39",
    content: "Dis is keynan did u shared my details with crb",
  },
  {
    userId: "3112",
    timestamp: "03-02-2017 07:19",
    content: "Can I get batch number plz",
  },
  {
    userId: "3112",
    timestamp: "02-02-2017 11:54",
    content:
      "Can I have direct contact thus I keep untouched with da concern authorities",
  },
  {
    userId: "3112",
    timestamp: "02-02-2017 11:52",
    content:
      "Am still getting from another financial institutions dat I owe branch 1068 n have already paid dat amount",
  },
  {
    userId: "3112",
    timestamp: "02-02-2017 11:40",
    content:
      "Dis is keynan,can u kindly forward ma details to crb hve got stucked somewhere",
  },
  {
    userId: "3170",
    timestamp: "01-02-2017 14:51",
    content:
      "sorry for that but i am still  searching for the money but will be paying the loan soon as the deadline i had set passed but i am doing all i can to settle the loan",
  },
  {
    userId: "3643",
    timestamp: "01-02-2017 11:05",
    content: "Alright. Thanks.",
  },
  {
    userId: "3701",
    timestamp: "01-02-2017 12:27",
    content: "Do I have any other loan that I didn't pay",
  },
  {
    userId: "3701",
    timestamp: "01-02-2017 12:26",
    content: "Why don't you want to give me a loan",
  },
  {
    userId: "3725",
    timestamp: "01-02-2017 08:12",
    content:
      "Sorry for the delay i block my mpesa pin but now its okey will pay by end of today",
  },
  {
    userId: "3775",
    timestamp: "03-02-2017 09:57",
    content:
      "Hi Branch, why do i have the text that my payment is late while its due today? 3feb 2017",
  },
  {
    userId: "3897",
    timestamp: "03-02-2017 18:42",
    content:
      "Thanks for understanding my situation I look forward to settling my loans on the time I have promised",
  },
  {
    userId: "3897",
    timestamp: "03-02-2017 08:15",
    content: "I'm expecting to clear by date 8/2/2017",
  },
  {
    userId: "3897",
    timestamp: "03-02-2017 07:56",
    content:
      "I've settled many of your loans before please don't spoil my credit report",
  },
  {
    userId: "3897",
    timestamp: "03-02-2017 07:46",
    content:
      "Hi branch kindly let me sort out the issue in a few days... I remain committed to settling my loans on time despite a few constraints",
  },
  {
    userId: "3900",
    timestamp: "02-02-2017 08:34",
    content: "Thanks branch had missed this",
  },
  {
    userId: "4178",
    timestamp: "01-02-2017 04:10",
    content:
      "Am sorry nlichelewa kulipa loan guys siyo kawaida yangu kuchelewesha lakini ni accident nlioata na mtoto wangu akachomeka na maji moto,naomba msamaha mwanzo mmeniinua sana kibiashara na ni ombi langu mtaendelea kunikopesha loan na tena ningeomba tafadhali don't lower loan limit please.will pay my loan on Friday, good day",
  },
  {
    userId: "4373",
    timestamp: "03-02-2017 07:23",
    content: "When am I qualified to get another loan",
  },
  {
    userId: "4442",
    timestamp: "02-02-2017 15:31",
    content:
      "Hi! Am sure acc details are correct. Have not received the loan yet...",
  },
  {
    userId: "4442",
    timestamp: "02-02-2017 14:22",
    content: "I require a feedback plz",
  },
  {
    userId: "4442",
    timestamp: "02-02-2017 13:07",
    content: "Did sent the C Certificate",
  },
  {
    userId: "4481",
    timestamp: "03-02-2017 06:41",
    content: "R u guys going to punish me for ever?",
  },
  {
    userId: "4522",
    timestamp: "01-02-2017 11:41",
    content: "Meanings",
  },
  {
    userId: "4708",
    timestamp: "02-02-2017 05:47",
    content: "I cleared last year for how long",
  },
  {
    userId: "5000",
    timestamp: "01-02-2017 20:56",
    content:
      "Hi Branch, am among your best beneficiaries of the Tala platform. However,  I have hit a 'dead-end' situation on my payment which is late for almost 5weeks after I took the loan. It has been caused by a temporal stagnation from my employment that was abruptly halted due to funding issues. Need to request for a little time extra as I commit myself to clear this loan I have. Kindly respond we agree on an amicable plan if payment. My Tel: 0723 496 592. Waiting for your feedback.   Regards,  Kenedy Sifuma",
  },
  {
    userId: "5297",
    timestamp: "03-02-2017 15:38",
    content:
      "it can't be 1264 had paid 400 earlier pls update your systems and give the right balance",
  },
  {
    userId: "5480",
    timestamp: "03-02-2017 12:28",
    content:
      "Hi branch,  Yes I have a problem which I thought it could have been through by now but it's not through. I have not been paid yet but kindly allow me to pay by next week please.",
  },
  {
    userId: "5696",
    timestamp: "03-02-2017 13:00",
    content: "Iam sending the full amount today just got busy",
  },
  {
    userId: "5724",
    timestamp: "03-02-2017 06:53",
    content:
      "Some lady from brunch calls me n starts to abuse me just because i said av paid a total of 1000 which she claims from her side av paid on 600 .that my loan is 18394 n yet it shows hear clearly its 17994 .my question is ,is that how people who have defaulted are addressed coz surely av started paying ? N av introduced people who are paying so why look down on orhers",
  },
  {
    userId: "6054",
    timestamp: "03-02-2017 15:46",
    content:
      "Hi, l have paid my loan on time but, my loan has been rejected. Why has it been rejected?",
  },
  {
    userId: "6326",
    timestamp: "03-02-2017 13:32",
    content: "Can't login",
  },
  {
    userId: "6515",
    timestamp: "02-02-2017 02:12",
    content: "The weekly text rem are a nuisance",
  },
  {
    userId: "6515",
    timestamp: "02-02-2017 02:11",
    content: "The weekly text rimindance",
  },
  {
    userId: "6515",
    timestamp: "02-02-2017 02:09",
    content:
      "Hi..please I can pay my loan in a month once..adjust your payment schedule and give options whether to pay weekly or monthly..",
  },
  {
    userId: "6884",
    timestamp: "01-02-2017 19:40",
    content: "OK I have paid all of it",
  },
  {
    userId: "7140",
    timestamp: "02-02-2017 13:06",
    content: "Why cant i have a loan now yet i have cleared my previous loan",
  },
  {
    userId: "7457",
    timestamp: "01-02-2017 22:26",
    content: "How do I get a loan",
  },
  {
    userId: "7725",
    timestamp: "02-02-2017 10:25",
    content:
      "Dear Branch, sorry for late payment of my loan. This is due to unavoidable circumstances but I strive to clear the loan before Wednesday 8th feb next week",
  },
  {
    userId: "7812",
    timestamp: "01-02-2017 10:19",
    content:
      "Hi Branch,by 7th i promise to make some payment to reduce my loan.",
  },
  {
    userId: "7837",
    timestamp: "01-02-2017 08:56",
    content: "So in short  because i don't  have the SMS  that the e reason.",
  },
  {
    userId: "7837",
    timestamp: "01-02-2017 06:07",
    content: "Why was my loan request rejected and i have been paying on time",
  },
  {
    userId: "7944",
    timestamp: "01-02-2017 07:37",
    content:
      "Dear Branch,Am experiencing difficult in payments but will deposit tomorrow evening.Thank you",
  },
  {
    userId: "8014",
    timestamp: "02-02-2017 15:36",
    content:
      "Hi ,whats the 7more days penalty for ?be frank n specify.I paid the previous loan on time.",
  },
  {
    userId: "8101",
    timestamp: "01-02-2017 09:43",
    content:
      "I have been trying this app for a long period... When i apply.. Am told try after 7 days...iy has become a song...i this app real or am waisting mi time and bundles for nothing?",
  },
  {
    userId: "8125",
    timestamp: "01-02-2017 02:20",
    content: "Will pay be4 15th",
  },
  {
    userId: "8392",
    timestamp: "02-02-2017 13:51",
    content:
      "I been with u For long an I made amistake but I won't repeat it agian I was having a sick ness....",
  },
  {
    userId: "8647",
    timestamp: "01-02-2017 15:53",
    content: "Sorry,I meant December 2016",
  },
  {
    userId: "8647",
    timestamp: "01-02-2017 15:52",
    content:
      "Hi Branch...now my Application was rejected recently on 1st Feb 2017. I had borrowed Sh.25,000 in December 2015 of which I was slightly late in paying but I payed the whole loan today only to be dissapointed when I apply for another. It says I reapply again in 7days which is too long for me at the moment because I desperately need the cash. How can you assist?",
  },
];

exports.addUsers = async (req, res) => {
  try {
    for (let i = 0; i < users.length; i++) {
      const chat = await Chat.findOne({ chatId: users[i].userId });
      console.log(chat, "******");
      var message = await Message.create({
        chat: chat._id,
        sender: chat.users[0],
        content: users[i].content,
        timestamp: users[i].timestamp,
      });
      message = await message.populate("sender", "userId isAgent");
      message = await message.populate("chat");
      message = await User.populate(message, {
        path: "chat.users",
        select: "userId isAgent",
      });
      await Chat.findByIdAndUpdate(chat._id, { latestMessage: message });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
  }
};
