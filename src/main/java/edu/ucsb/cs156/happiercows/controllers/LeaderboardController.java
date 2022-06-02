package edu.ucsb.cs156.happiercows.controllers;

import edu.ucsb.cs156.happiercows.errors.EntityNotFoundException;
import edu.ucsb.cs156.happiercows.models.CurrentUser;
import edu.ucsb.cs156.happiercows.entities.Profit;
import edu.ucsb.cs156.happiercows.entities.Leaderboard;
import edu.ucsb.cs156.happiercows.entities.Commons;
import edu.ucsb.cs156.happiercows.entities.User;
import edu.ucsb.cs156.happiercows.entities.UserCommons;
import edu.ucsb.cs156.happiercows.repositories.CommonsRepository;
import edu.ucsb.cs156.happiercows.repositories.LeaderboardRepository;
import edu.ucsb.cs156.happiercows.repositories.UserCommonsRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import lombok.extern.slf4j.Slf4j;

import javax.validation.Valid;
import java.util.Optional;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Api(description = "Leaderboards")
@RequestMapping("/api/leaderboard")
@RestController
@Slf4j

public class LeaderboardController extends ApiController {

    @Autowired
    CommonsRepository commonsRepository;

    @Autowired
    UserCommonsRepository userCommonsRepository;

    @Autowired
    LeaderboardRepository leaderboardRepository;

    @ApiOperation(value = "Get a single leaderboard")
    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("")
    public Leaderboard getLeaderboardById(
            @ApiParam("commonsid") @RequestParam Long commonsid) {
        Long userId = getCurrentUser().getUser().getId();

        Leaderboard leaderboard = leaderboardRepository.findById(commonsid).orElseThrow(() -> new EntityNotFoundException(Leaderboard.class, commonsid));
        return leaderboard;
    }

    @ApiOperation(value = "Get a single leaderboard for admin")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/admin")
    public Leaderboard getLeaderboardById_admin(
            @ApiParam("commonsid") @RequestParam Long commonsid) {
        Leaderboard leaderboard = leaderboardRepository.findById(commonsid).orElseThrow(() -> new EntityNotFoundException(Leaderboard.class, commonsid));
        return leaderboard;
    }

    @ApiOperation(value = "List all leaderboards")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/admin/all")
    public Iterable<Leaderboard> allUsersLeaderboards() {
        Iterable<Leaderboard> leaderbaord = leaderboardRepository.findAll();
        return leaderbaord;
    }

    @ApiOperation(value = "Create a new leaderboard as admin")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/admin/post")
    public Leaderboard postLeaderboard_admin(
            @ApiParam("playerName") @RequestParam String playerName,
            @ApiParam("numOfCows") @RequestParam long numOfCows,
            @ApiParam("amtOfMoney") @RequestParam long amtOfMoney,
            @ApiParam("averageCowHealth") @RequestParam long averageCowHealth){
     

        Leaderboard createdLeaderboard = new Leaderboard();
        createdLeaderboard.setPlayerName(playerName);
        createdLeaderboard.setNumOfCows(numOfCows);
        createdLeaderboard.setAmtOfMoney(amtOfMoney);
        createdLeaderboard.setAverageCowHealth(averageCowHealth);
        Leaderboard savedLeaderboard = leaderboardRepository.save(createdLeaderboard);
        return savedLeaderboard;
    }


    @ApiOperation(value = "Delete leaderboards as admin")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/admin")
    public Object deleteLeaderboard_Admin(
            @ApiParam("commonsid") @RequestParam Long commonsid) {
        Leaderboard leaderboard = leaderboardRepository.findById(commonsid).orElseThrow(() -> new EntityNotFoundException(Leaderboard.class, commonsid));

        leaderboardRepository.delete(leaderboard);

        return genericMessage("Leaderboard with id %s deleted".formatted(commonsid));
    }

    @ApiOperation(value = "Update a single leaderboard as admin")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/admin")
    public Leaderboard putLeaderboardById_admin(
            @ApiParam("commonsid") @RequestParam Long commonsid,
            @RequestBody @Valid Leaderboard newLeaderboard) {
        Leaderboard leaderboard = leaderboardRepository.findById(commonsid).orElseThrow(() -> new EntityNotFoundException(Leaderboard.class, commonsid));

        leaderboard.setPlayerName(newLeaderboard.getPlayerName());
        leaderboard.setNumOfCows(newLeaderboard.getNumOfCows());
        leaderboard.setAmtOfMoney(newLeaderboard.getAmtOfMoney());
        leaderboard.setAverageCowHealth(newLeaderboard.getAverageCowHealth());
    
        leaderboardRepository.save(leaderboard);

        return leaderboard;
    }
}