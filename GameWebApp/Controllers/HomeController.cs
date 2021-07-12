using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GameWebApp.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult TTT2P()
        {
            ViewBag.Message = "Let's play Tic Tac Toe";

            return View();
        }

        public ActionResult TTT1P()
        {
            ViewBag.Message = "Let's play Tic Tac Toe";

            return View();
        }
        public ActionResult CF1P()
        {
            ViewBag.Message = "Let's play Connect Four";

            return View();
        }
    }
}