package com.example.DB_Tests;

import com.example.DB_Tests.DomainLayer.DBManager;
import com.example.DB_Tests.DomainLayer.Enums.LeagueLevel;
import com.example.DB_Tests.DomainLayer.Enums.PlayerRole;
import com.example.DB_Tests.DomainLayer.LeagueManagment.*;
import com.example.DB_Tests.DomainLayer.MyFactory;
import com.example.DB_Tests.DomainLayer.Users.*;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.*;

@SpringBootTest

public class OwnerTest {

    @Test
    void removeOwnerTest() {
        Subscriber s1 = MyFactory.createSubscriber("a","s","d");
        Subscriber s2 = MyFactory.createSubscriber("2","2","2");
        Subscriber s3 = MyFactory.createSubscriber("3","3","3");
        Subscriber s4 = MyFactory.createSubscriber("4","4","4");

        s2.setId(1);
        s3.setId(2);
        s4.setId(3);

        s1.makeOwnerActive();
        s2.makeOwnerActive();
        s3.makeOwnerActive();
        s4.makeOwnerActive();

        Owner o1 = s1.getOwner();
        Owner o2 = s2.getOwner();
        Owner o3 = s3.getOwner();
        Owner o4 = s4.getOwner();

        Team t = MyFactory.createTeam(o1,"HBS");

        Set<Owner> f1 = new HashSet<>();
        f1.add(o2);
        o1.setOwners(f1);

        Set<Owner> f2 = new HashSet<>();
        f2.add(o3);
        o2.setOwners(f2);

        Set<Owner> f3 = new HashSet<>();
        f3.add(o4);
        o3.setOwners(f3);
        o1.removeOwner(o2.getSid());
    }

    @Test
    public void addPlayersTest(){
        Subscriber subscriber = MyFactory.createSubscriber("ohad-far2","s","ohad");
        subscriber.makeFARActive();
        FAR far = subscriber.getFar();
        far.initializeLeague(LeagueLevel.PremierLeague,"La-Liga");

        Subscriber subscriber2  = MyFactory.createSubscriber("owner","none","none");
        subscriber2.makeOwnerActive();


        Team team2 = MyFactory.createTeam(subscriber2.getOwner(),"RMA");
        List<Team> teams = new ArrayList<>();
        teams.add(team2);
        int[] team_ids = new int[3];
        team_ids[0] = team2.getTid();

        Subscriber s3 = MyFactory.createSubscriber("player1","none","none");
        Subscriber s4 = MyFactory.createSubscriber("player2","none","none");
        Subscriber s5 = MyFactory.createSubscriber("player3","none","none");


        s3.makePlayerActive(PlayerRole.ATTACKER, LocalDate.now());
        s4.makePlayerActive(PlayerRole.MIDFIELDER,LocalDate.now());
        s5.makePlayerActive(PlayerRole.DEFENDER,LocalDate.now());
        Player player = s3.getPlayer();
        Player player1 = s4.getPlayer();
        Player player2 = s5.getPlayer();
        Set<Integer> players = new HashSet<>();
        players.add(player.getSid());
        players.add(player1.getSid());
        players.add(player2.getSid());


        Owner owner = subscriber2.getOwner();
        owner.addPlayers(players);
    }

    @Test
        void removePlayerTest(){
        Owner owner = (Owner) DBManager.getObject(Owner.class,2);
        Team team = (Team) DBManager.getObject(Team.class,1);
        Set<Player> players = team.getPlayers();
        owner.removePlayer(3);
    }

}
