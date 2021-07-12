using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GameWebApp.Models
{
    public class TicTacToe
    {
        private String winner { get; set; }

        public TicTacToe()
        {
            this.winner = "";
        }
        public TicTacToe(String winner)
        {
            this.winner = winner;
        }
    }
}