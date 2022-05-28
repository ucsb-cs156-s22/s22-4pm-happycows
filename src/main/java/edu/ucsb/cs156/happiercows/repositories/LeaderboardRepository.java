
package edu.ucsb.cs156.happiercows.repositories;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import edu.ucsb.cs156.happiercows.entities.Leaderboard;


@Repository
public interface LeaderboardRepository extends CrudRepository<Leaderboard, Long> {

}
